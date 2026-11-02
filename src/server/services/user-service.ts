import "server-only";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { customerProfiles, users } from "@/db/schema";
import type { UserRole } from "@/lib/auth/types";

const PASSWORD_SALT_ROUNDS = 12;

export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super("An account with this email already exists.");
    this.name = "EmailAlreadyRegisteredError";
  }
}

export async function findUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);
  return user ?? null;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
}

/**
 * Creates a user + customer profile in one transaction. Reused by the public
 * registration action; also usable for admin-created customer accounts.
 */
export async function createCustomerUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}) {
  const normalizedEmail = input.email.toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing) throw new EmailAlreadyRegisteredError();

  const passwordHash = await hashPassword(input.password);

  return db.transaction(async (tx) => {
    const [user] = await tx
      .insert(users)
      .values({
        email: normalizedEmail,
        passwordHash,
        role: "customer" satisfies UserRole,
      })
      .returning();

    await tx.insert(customerProfiles).values({
      userId: user.id,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
    });

    return user;
  });
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super("Your current password is incorrect.");
    this.name = "IncorrectPasswordError";
  }
}

export async function updateCustomerProfile(
  userId: string,
  input: { firstName: string; lastName: string; phone: string; email: string },
) {
  const normalizedEmail = input.email.toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing && existing.id !== userId) throw new EmailAlreadyRegisteredError();

  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({ email: normalizedEmail, updatedAt: new Date() })
      .where(eq(users.id, userId));

    await tx
      .update(customerProfiles)
      .set({
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        updatedAt: new Date(),
      })
      .where(eq(customerProfiles.userId, userId));
  });
}

export async function changePassword(
  userId: string,
  input: { currentPassword: string; newPassword: string },
) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) throw new Error("User not found.");

  const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
  if (!valid) throw new IncorrectPasswordError();

  const passwordHash = await hashPassword(input.newPassword);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, userId));
}
