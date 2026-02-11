import { useState, useCallback } from "react";
import { useForm, zodResolver } from "@/lib/react-hook-form";
import type { UseFormReturn, SubmitHandler } from "@/lib/react-hook-form";
import { useTranslation } from "@/lib/i18n";
import { contactFormSchema, type ContactFormData } from "./ContactPage.schema";

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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Log the form data (in production, this would be sent to an API)
        console.log("Contact form submitted:", data);

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
