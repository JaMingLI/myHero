import { bind } from "@/utils";
import {
  MainLayoutViewModel,
  type IMainLayoutViewModel,
} from "./MainLayout.view-model";
import {
  IconMoon,
  IconMenu,
  IconGitHub,
  IconLinkedin,
  IconMail,
  IconHome,
  IconFolder,
  IconActivity,
} from "@/assets";
import { LanguageSwitcher } from "@/components";

function MainLayoutViewController({ children }: IMainLayoutViewModel) {
  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-[120px] border-b border-[var(--color-border)]">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-[var(--color-accent)] rounded-md">
            <span className="font-secondary text-base md:text-lg font-bold text-[var(--color-bg-primary)]">
              A
            </span>
          </div>
          <span className="font-secondary text-base md:text-lg font-semibold text-[var(--color-text-primary)] hidden sm:block">
            Alen.dev
          </span>
        </div>

        {/* Desktop & Tablet Navigation - md: 以上顯示 */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#home"
            className="font-primary text-sm font-medium text-[var(--color-accent)]"
          >
            Home
          </a>
          <a
            href="#projects"
            className="font-primary text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="font-primary text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Skills
          </a>
          <a
            href="#activity"
            className="font-primary text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Activity
          </a>
          <a
            href="#contact"
            className="font-primary text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Contact
          </a>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-secondary)] rounded-md hover:bg-[#2d3a52] transition-colors">
            <img
              src={IconMoon}
              alt="Theme"
              className="w-5 h-5 opacity-70"
            />
          </button>
        </nav>

        {/* Mobile Hamburger - md: 以下顯示 */}
        <button className="flex md:hidden items-center justify-center w-10 h-10 rounded-md">
          <img src={IconMenu} alt="Menu" className="w-6 h-6" />
        </button>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Footer - Desktop & Tablet */}
      <footer className="hidden md:flex items-center justify-between h-16 px-8 md:px-12 lg:px-[120px] border-t border-[var(--color-border)]">
        <span className="font-primary text-[13px] text-[var(--color-text-muted)]">
          © 2025 Alen. All rights reserved.
        </span>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <img
              src={IconGitHub}
              alt="GitHub"
              className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <img
              src={IconLinkedin}
              alt="LinkedIn"
              className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity"
            />
          </a>
          <a
            href="mailto:contact@alen.dev"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <img
              src={IconMail}
              alt="Email"
              className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </footer>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden items-center justify-around h-14 px-2 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <a
          href="#home"
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <img src={IconHome} alt="Home" className="w-5 h-5" />
          <span className="font-primary text-[10px] font-semibold text-[var(--color-accent)]">
            Home
          </span>
        </a>
        <a
          href="#projects"
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <img
            src={IconFolder}
            alt="Projects"
            className="w-5 h-5 opacity-50"
          />
          <span className="font-primary text-[10px] text-[var(--color-text-muted)]">
            Projects
          </span>
        </a>
        <a
          href="#activity"
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <img
            src={IconActivity}
            alt="Activity"
            className="w-5 h-5 opacity-50"
          />
          <span className="font-primary text-[10px] text-[var(--color-text-muted)]">
            Activity
          </span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <img src={IconMail} alt="Contact" className="w-5 h-5 opacity-50" />
          <span className="font-primary text-[10px] text-[var(--color-text-muted)]">
            Contact
          </span>
        </a>
      </div>
    </div>
  );
}

export const MainLayout = bind(MainLayoutViewController, MainLayoutViewModel);
