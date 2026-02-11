import { z } from "@/lib/zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "contact.errors.nameRequired"),
  email: z
    .string()
    .min(1, "contact.errors.emailRequired")
    .email("contact.errors.emailInvalid"),
  subject: z.string().min(1, "contact.errors.subjectRequired"),
  message: z.string().min(1, "contact.errors.messageRequired"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
