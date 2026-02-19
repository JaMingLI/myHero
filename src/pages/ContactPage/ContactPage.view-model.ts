import { useState, useCallback } from "react";
import { useForm, zodResolver } from "@/lib/react-hook-form";
import type { UseFormReturn, SubmitHandler } from "@/lib/react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { contactFormSchema, type ContactFormData } from "./ContactPage.schema";
import { ContactService } from "@/domain";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContactPageProps {
  // Add props if needed in the future
}

export interface IContactPageViewModel {
  t: ReturnType<typeof useTranslation>["t"];
  form: UseFormReturn<ContactFormData>;
  onSubmit: SubmitHandler<ContactFormData>;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
}

export const ContactPageViewModel = (
  _props: ContactPageProps
): IContactPageViewModel => {
  void _props; // Suppress unused variable warning
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = useCallback(
    async (data) => {
      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        await ContactService.sendContact({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        });

        // Reset form and show success
        form.reset();
        setSubmitStatus("success");

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form]
  );

  return {
    t,
    form,
    onSubmit,
    isSubmitting,
    submitStatus,
  };
};
