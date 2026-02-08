import { bind } from "@/utils";
import { cn } from "@/lib/utils";
import {
  MainLayoutViewModel,
  type IMainLayoutViewModel,
} from "./MainLayout.view-model";

function MainLayoutViewController({
  children,
  isSidebarOpen,
  toggleSidebar,
}: IMainLayoutViewModel) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-gray-800 text-white transition-transform",
          isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">MyHero</span>
          <button
            onClick={toggleSidebar}
            className="rounded p-1 hover:bg-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-4 px-4">
          <a
            href="/"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            Dashboard
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4">
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="mr-4 rounded p-1 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-semibold">My Hero App</h1>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export const MainLayout = bind(MainLayoutViewController, MainLayoutViewModel);
