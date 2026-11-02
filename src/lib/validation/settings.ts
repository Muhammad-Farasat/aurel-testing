import { z } from "zod";

export const contactSettingsSchema = z.object({
  contactEmail: z.email("Enter a valid email address"),
  contactPhone: z.string().trim().min(5, "Enter a valid phone number").max(32),
  businessAddress: z.string().trim().max(500).default(""),
  supportHours: z.string().trim().max(120).default(""),
});

export type ContactSettingsInput = z.infer<typeof contactSettingsSchema>;
