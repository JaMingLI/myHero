import { bind, cn } from "@/utils";
import { Link } from "react-router-dom";
import {
  MainLayoutViewModel,
  type IMainLayoutViewModel,
} from "./MainLayout.view-model";
import {
  IconMoon,
  IconSun,
  IconMenu,
  IconGitHub,
  IconLinkedin,
  IconMail,
  IconHome,
  IconFolder,
  IconActivity,
} from "@/assets";
import { LanguageSwitcher, MobileMenu } from "@/components";
import { APP_VERSION } from "@/app/config";

function MainLayoutViewController({
  children,
  t,
  currentPath,
  paths,
  isMenuOpen,
  openMenu,
  closeMenu,
  isDark,
  toggleTheme,
}: IMainLayoutViewModel) {
  // Helper to determine if a path is active
  const isActive = (path: string) => currentPath === path;

  // Navigation link styles
  const getNavLinkClass = (path: string) =>
    cn(
      "font-primary text-sm",
      isActive(path)
        ? "font-medium text-[var(--color-accent)]"
        : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
    );

  // Mobile tab styles
  const getMobileTabTextClass = (path: string) =>
    cn(
      "font-primary text-[10px]",
      isActive(path)
        ? "font-semibold text-[var(--color-accent)]"
        : "text-[var(--color-text-muted)]"
    );

  const getMobileTabIconClass = (path: string) =>
    cn(
      "w-5 h-5",
      isActive(path)
        ? "text-[var(--color-accent)]"
        : "text-[var(--color-text-muted)] opacity-50"
    );

  return (
    <div className="flex flex-col h-full w-full bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 md:px-12 lg:px-[120px] border-b border-[var(--color-border)]">
        {/* Logo Area */}
        <Link to={paths.HOME} className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-[var(--color-accent)] rounded-md">
            <span className="font-secondary text-base md:text-lg font-bold text-[var(--color-bg-primary)]">
              A
            </span>
          </div>
          <span className="font-secondary text-base md:text-lg font-semibold text-[var(--color-text-primary)] hidden sm:block">
            Alen.dev
          </span>
        </Link>

        {/* Desktop & Tablet Navigation - md: 以上顯示 */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to={paths.HOME} className={getNavLinkClass(paths.HOME)}>
            {t("navigation.home")}
          </Link>
          <Link to={paths.PROJECTS} className={getNavLinkClass(paths.PROJECTS)}>
            {t("navigation.projects")}
          </Link>
          <Link to={paths.SKILLS} className={getNavLinkClass(paths.SKILLS)}>
            {t("navigation.skills")}
          </Link>
          <Link to={paths.ACTIVITY} className={getNavLinkClass(paths.ACTIVITY)}>
            {t("navigation.activity")}
          </Link>
          <Link to={paths.CONTACT} className={getNavLinkClass(paths.CONTACT)}>
            {t("navigation.contact")}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 bg-[var(--color-bg-secondary)] rounded-md hover:opacity-80 transition-opacity"
            aria-label={t("common.theme")}
          >
            {isDark ? (
              <IconMoon className="w-5 h-5 opacity-70 text-[var(--color-text-secondary)]" />
            ) : (
              <IconSun className="w-5 h-5 opacity-70 text-[var(--color-text-secondary)]" />
            )}
          </button>
        </nav>

        {/* Mobile Hamburger - md: 以下顯示 */}
        <button
          onClick={openMenu}
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-md"
          aria-label={t("common.menu")}
        >
          <IconMenu className="w-6 h-6 text-[var(--color-text-primary)]" />
        </button>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        currentPath={currentPath}
      />

      {/* Page content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Footer - Desktop & Tablet */}
      <footer className="hidden md:flex items-center justify-between h-16 px-8 md:px-12 lg:px-[120px] border-t border-[var(--color-border)]">
        <span className="font-primary text-[13px] text-[var(--color-text-muted)]">
          {t("footer.copyright")}
          <span className="ml-2 text-[11px] opacity-60">v{APP_VERSION}</span>
        </span>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JaMingLI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <IconGitHub className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://www.linkedin.com/in/alen-li-508b60255/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <IconLinkedin className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="mailto:kampfer06@gmail.com"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <IconMail className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </footer>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden items-center justify-around h-14 px-2 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
        <Link
          to={paths.HOME}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <IconHome className={getMobileTabIconClass(paths.HOME)} />
          <span className={getMobileTabTextClass(paths.HOME)}>
            {t("navigation.home")}
          </span>
        </Link>
        <Link
          to={paths.PROJECTS}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <IconFolder className={getMobileTabIconClass(paths.PROJECTS)} />
          <span className={getMobileTabTextClass(paths.PROJECTS)}>
            {t("navigation.projects")}
          </span>
        </Link>
        <Link
          to={paths.ACTIVITY}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <IconActivity className={getMobileTabIconClass(paths.ACTIVITY)} />
          <span className={getMobileTabTextClass(paths.ACTIVITY)}>
            {t("navigation.activity")}
          </span>
        </Link>
        <Link
          to={paths.CONTACT}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
        >
          <IconMail className={getMobileTabIconClass(paths.CONTACT)} />
          <span className={getMobileTabTextClass(paths.CONTACT)}>
            {t("navigation.contact")}
          </span>
        </Link>
      </div>
    </div>
  );
}

export const MainLayout = bind(MainLayoutViewController, MainLayoutViewModel);
