import { bind } from "@/utils";
import {
  MainLayoutViewModel,
  type IMainLayoutViewModel,
} from "./MainLayout.view-model";
import {
  IconMoon,
  IconGitHub,
  IconLinkedin,
  IconMail,
} from "@/assets";

function MainLayoutViewController({
  children,
}: IMainLayoutViewModel) {
  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-12 border-b border-[var(--color-border)]">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-[var(--color-accent)] rounded-md">
            <span className="font-secondary text-[var(--color-bg-primary)] text-base font-bold">
              A
            </span>
          </div>
          <span className="font-secondary text-[var(--color-text-primary)] text-base font-semibold">
            Alen.dev
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
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

          {/* Theme Toggle */}
          <button className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-secondary)] rounded-md hover:bg-[#2d3a4f] transition-colors">
            <img src={IconMoon} alt="Theme" className="w-[18px] h-[18px] opacity-70" />
          </button>
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between h-16 px-12 border-t border-[var(--color-border)]">
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
            <img src={IconGitHub} alt="GitHub" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <img src={IconLinkedin} alt="LinkedIn" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <img src={IconMail} alt="Email" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export const MainLayout = bind(MainLayoutViewController, MainLayoutViewModel);
