import { bind } from "@/utils";
import { motion } from "@/lib/framer-motion";
import type { Variants } from "@/lib/framer-motion";
import { IconMail, IconGitHub, IconLinkedin, IconSend, IconCheck, IconEraser } from "@/assets";
import type { TranslationKey } from "@/i18n/types";
import {
  ContactPageViewModel,
  type IContactPageViewModel,
} from "./ContactPage.view-model";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Contact Info Item Component
function ContactInfoItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-[var(--card)] rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors group"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-[var(--color-bg-secondary)] rounded-lg">
        <Icon className="w-5 h-5 opacity-70 text-[var(--color-text-secondary)]" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors">
          {value}
        </span>
      </div>
    </a>
  );
}

// Input Field Component
function InputField({
  label,
  placeholder,
  error,
  value,
  onClear,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: string;
  value?: string;
  onClear?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-sm font-medium text-[var(--color-text-secondary)]">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-9 bg-[var(--card)] border rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors ${
            error ? "border-red-500" : "border-[var(--color-border)]"
          }`}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <IconEraser className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

// Textarea Field Component
function TextareaField({
  label,
  placeholder,
  error,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--color-text-secondary)]">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={5}
        className={`w-full px-4 py-3 bg-[var(--card)] border rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-none ${
          error ? "border-red-500" : "border-[var(--color-border)]"
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function ContactPageViewController({
  t,
  form,
  onSubmit,
  isSubmitting,
  submitStatus,
}: IContactPageViewModel) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const nameValue = watch("name");
  const emailValue = watch("email");
  const subjectValue = watch("subject");

  return (
    <section className="flex-1 flex flex-col px-4 md:px-8 lg:px-[120px] py-6 md:py-10 lg:py-12">
      <motion.div
        className="flex flex-col w-full max-w-[1200px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title Section */}
        <motion.div
          className="text-center mb-6 md:mb-8 lg:mb-10 lg:text-left"
          variants={itemVariants}
        >
          <h1 className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-[var(--color-text-primary)]">
            {t("contact.title")}
          </h1>
          <p className="text-sm md:text-[15px] lg:text-base text-[var(--color-text-secondary)] mt-2">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Content Area - RWD Switch */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Info (Desktop only) */}
          <motion.div
            className="hidden lg:flex flex-col gap-4 w-[320px] shrink-0"
            variants={itemVariants}
          >
            <ContactInfoItem
              icon={IconMail}
              label={t("contact.info.email")}
              value="alen@example.com"
              href="mailto:alen@example.com"
            />
            <ContactInfoItem
              icon={IconGitHub}
              label={t("contact.info.github")}
              value="github.com/alen"
              href="https://github.com/alen"
            />
            <ContactInfoItem
              icon={IconLinkedin}
              label={t("contact.info.linkedin")}
              value="linkedin.com/in/alen"
              href="https://linkedin.com/in/alen"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-[var(--color-bg-secondary)] rounded-xl p-5 md:p-7 lg:p-8 flex-1 max-w-full lg:max-w-none md:max-w-[500px] md:mx-auto lg:mx-0"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Name + Email: Tablet side-by-side, Mobile/Desktop stacked */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-4 lg:flex-col lg:gap-5">
                <InputField
                  label={t("contact.form.name")}
                  placeholder={t("contact.form.namePlaceholder")}
                  value={nameValue}
                  onClear={() => setValue("name", "", { shouldValidate: true })}
                  error={errors.name?.message ? String(t(errors.name.message as TranslationKey)) : undefined}
                  {...register("name")}
                />
                <InputField
                  label={t("contact.form.email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  type="email"
                  value={emailValue}
                  onClear={() => setValue("email", "", { shouldValidate: true })}
                  error={errors.email?.message ? String(t(errors.email.message as TranslationKey)) : undefined}
                  {...register("email")}
                />
              </div>

              {/* Subject */}
              <InputField
                label={t("contact.form.subject")}
                placeholder={t("contact.form.subjectPlaceholder")}
                value={subjectValue}
                onClear={() => setValue("subject", "", { shouldValidate: true })}
                error={errors.subject?.message ? String(t(errors.subject.message as TranslationKey)) : undefined}
                {...register("subject")}
              />

              {/* Message */}
              <TextareaField
                label={t("contact.form.message")}
                placeholder={t("contact.form.messagePlaceholder")}
                error={errors.message?.message ? String(t(errors.message.message as TranslationKey)) : undefined}
                {...register("message")}
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] rounded-lg font-semibold text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : (
                  <>
                    <IconSend className="w-4 h-4" />
                    {t("contact.form.submit")}
                  </>
                )}
              </motion.button>

              {/* Success/Error Message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <IconCheck className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    {t("contact.toast.success")}
                  </span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <span className="text-sm text-red-400">
                    {t("contact.toast.error")}
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export const ContactPage = bind(ContactPageViewController, ContactPageViewModel);
