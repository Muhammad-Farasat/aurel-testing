import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "./client";
import {
  chauffeurProfiles,
  customerProfiles,
  pricingRules,
  serviceAreas,
  siteSettings,
  SITE_SETTING_KEYS,
  users,
  vehicleCategories,
  vehicles,
} from "./schema";

/**
 * Idempotent dev/demo seed. Safe to re-run: every insert is keyed on a
 * natural unique field and skipped if it already exists.
 *
 * The initial admin account is never hard-coded. Set ADMIN_EMAIL /
 * ADMIN_PASSWORD to choose it; otherwise a random password is generated and
 * printed once. In production, seeding without those two env vars is refused.
 */

async function hash(password: string) {
  return bcrypt.hash(password, 12);
}

async function upsertUser(email: string, passwordHash: string, role: "customer" | "chauffeur" | "admin") {
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(users).values({ email, passwordHash, role }).returning();
  return created;
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Refusing to seed a default admin in production. Set ADMIN_EMAIL and ADMIN_PASSWORD.",
      );
    }
    const generatedEmail = "admin@aurel.local";
    const [existing] = await db.select().from(users).where(eq(users.email, generatedEmail)).limit(1);
    if (existing) return existing;

    const generatedPassword = randomBytes(9).toString("base64url");
    const user = await upsertUser(generatedEmail, await hash(generatedPassword), "admin");
    console.log("\nSeeded development admin account:");
    console.log(`  email:    ${generatedEmail}`);
    console.log(`  password: ${generatedPassword}\n`);
    return user;
  }

  return upsertUser(email, await hash(password), "admin");
}

const VEHICLE_CATEGORY_SEEDS = [
  {
    key: "business_class",
    name: "Business Class",
    description: "Sedans suited to daily business travel and airport transfers.",
    sortOrder: 1,
  },
  {
    key: "first_class",
    name: "First Class",
    description: "Flagship sedans for clients who expect the most refined experience.",
    sortOrder: 2,
  },
  {
    key: "luxury_suv",
    name: "Luxury SUV",
    description: "Spacious SUVs for groups, extra luggage, or additional comfort.",
    sortOrder: 3,
  },
  {
    key: "luxury_van",
    name: "Luxury Van",
    description: "Chauffeured vans for larger groups and full-day itineraries.",
    sortOrder: 4,
  },
] as const;

async function seedVehicleCategories() {
  const categoryIds: Record<string, string> = {};
  for (const category of VEHICLE_CATEGORY_SEEDS) {
    const [existing] = await db
      .select()
      .from(vehicleCategories)
      .where(eq(vehicleCategories.key, category.key))
      .limit(1);
    const row = existing ?? (await db.insert(vehicleCategories).values(category).returning())[0];
    categoryIds[category.key] = row.id;
  }
  return categoryIds;
}

async function seedVehicles(categoryIds: Record<string, string>) {
  const fleet = [
    {
      categoryKey: "business_class",
      name: "Mercedes-Benz E-Class",
      model: "E 350",
      year: 2024,
      passengerCapacity: 3,
      luggageCapacity: 2,
      amenities: ["Wi-Fi", "Bottled water", "Phone charging"],
      startingPrice: 6500,
    },
    {
      categoryKey: "first_class",
      name: "Mercedes-Benz S-Class",
      model: "S 500",
      year: 2024,
      passengerCapacity: 3,
      luggageCapacity: 2,
      amenities: ["Wi-Fi", "Reclining rear seats", "Privacy glass", "Refreshments"],
      startingPrice: 11000,
    },
    {
      categoryKey: "luxury_suv",
      name: "Cadillac Escalade",
      model: "Escalade ESV",
      year: 2023,
      passengerCapacity: 6,
      luggageCapacity: 6,
      amenities: ["Wi-Fi", "Extra luggage space", "Captain's chairs"],
      startingPrice: 12500,
    },
    {
      categoryKey: "luxury_van",
      name: "Mercedes-Benz Sprinter",
      model: "Sprinter Executive",
      year: 2023,
      passengerCapacity: 10,
      luggageCapacity: 10,
      amenities: ["Wi-Fi", "Conference seating", "Climate zones"],
      startingPrice: 18000,
    },
  ];

  for (const vehicle of fleet) {
    const [existing] = await db.select().from(vehicles).where(eq(vehicles.name, vehicle.name)).limit(1);
    if (existing) continue;

    const { categoryKey, ...values } = vehicle;
    await db.insert(vehicles).values({ ...values, categoryId: categoryIds[categoryKey] });
  }
}

const SERVICE_TYPES = ["point_to_point", "airport_transfer", "hourly", "full_day"] as const;

const BASE_RATES: Record<(typeof SERVICE_TYPES)[number], Partial<typeof pricingRules.$inferInsert>> = {
  point_to_point: { baseFare: "12.00", perKmRate: "2.10", taxPercent: "8" },
  airport_transfer: { baseFare: "18.00", perKmRate: "2.10", airportFee: "15.00", taxPercent: "8" },
  hourly: { hourlyRate: "65.00", taxPercent: "8" },
  full_day: { fullDayRate: "650.00", taxPercent: "8" },
};

const CATEGORY_MULTIPLIERS: Record<string, string> = {
  business_class: "1.00",
  first_class: "1.45",
  luxury_suv: "1.35",
  luxury_van: "1.6",
};

async function seedPricingRules(categoryIds: Record<string, string>) {
  for (const serviceType of SERVICE_TYPES) {
    const [existing] = await db
      .select()
      .from(pricingRules)
      .where(and(eq(pricingRules.serviceType, serviceType), isNull(pricingRules.vehicleCategoryId)))
      .limit(1);
    if (!existing) {
      await db.insert(pricingRules).values({ serviceType, ...BASE_RATES[serviceType] });
    }

    for (const [categoryKey, categoryId] of Object.entries(categoryIds)) {
      const [existingCategoryRule] = await db
        .select()
        .from(pricingRules)
        .where(
          and(eq(pricingRules.serviceType, serviceType), eq(pricingRules.vehicleCategoryId, categoryId)),
        )
        .limit(1);
      if (!existingCategoryRule) {
        await db.insert(pricingRules).values({
          serviceType,
          vehicleCategoryId: categoryId,
          categoryMultiplier: CATEGORY_MULTIPLIERS[categoryKey],
        });
      }
    }
  }
}

async function seedServiceAreas() {
  const areas = [
    { name: "New York Metro", city: "New York", country: "United States" },
    { name: "Los Angeles Metro", city: "Los Angeles", country: "United States" },
  ];
  for (const area of areas) {
    const [existing] = await db.select().from(serviceAreas).where(eq(serviceAreas.name, area.name)).limit(1);
    if (!existing) await db.insert(serviceAreas).values(area);
  }
}

async function seedSiteSettings() {
  const defaults = [
    { key: SITE_SETTING_KEYS.contactEmail, value: "concierge@aurel.example" },
    { key: SITE_SETTING_KEYS.contactPhone, value: "+1 (555) 010-0100" },
    { key: SITE_SETTING_KEYS.businessAddress, value: "One Park Avenue, New York, NY" },
    { key: SITE_SETTING_KEYS.supportHours, value: "24/7" },
  ];
  for (const setting of defaults) {
    const [existing] = await db.select().from(siteSettings).where(eq(siteSettings.key, setting.key)).limit(1);
    if (!existing) await db.insert(siteSettings).values(setting);
  }
}

async function seedDemoChauffeur() {
  const user = await upsertUser("chauffeur.demo@aurel.local", await hash("ChauffeurDemo123!"), "chauffeur");
  const [existing] = await db
    .select()
    .from(chauffeurProfiles)
    .where(eq(chauffeurProfiles.userId, user.id))
    .limit(1);
  if (!existing) {
    await db.insert(chauffeurProfiles).values({
      userId: user.id,
      firstName: "Marcus",
      lastName: "Reyes",
      phone: "+1 (555) 020-0200",
      licenseNumber: "CHF-10234",
      isAvailable: true,
    });
  }
}

async function seedDemoCustomer() {
  const user = await upsertUser("customer.demo@aurel.local", await hash("CustomerDemo123!"), "customer");
  const [existing] = await db
    .select()
    .from(customerProfiles)
    .where(eq(customerProfiles.userId, user.id))
    .limit(1);
  if (!existing) {
    await db.insert(customerProfiles).values({
      userId: user.id,
      firstName: "Dana",
      lastName: "Whitfield",
      phone: "+1 (555) 030-0300",
    });
  }
}

async function main() {
  console.log("Seeding database...");
  await seedAdmin();
  const categoryIds = await seedVehicleCategories();
  await seedVehicles(categoryIds);
  await seedPricingRules(categoryIds);
  await seedServiceAreas();
  await seedSiteSettings();
  await seedDemoChauffeur();
  await seedDemoCustomer();
  console.log("Seed complete.");
  console.log("\nDemo accounts (development only):");
  console.log("  chauffeur.demo@aurel.local / ChauffeurDemo123!");
  console.log("  customer.demo@aurel.local  / CustomerDemo123!");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
