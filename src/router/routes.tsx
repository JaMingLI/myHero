import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, ProjectsPage, ActivityPage } from "@/pages";
import { MainLayout } from "@/layouts";
import { PATHS } from "./paths";

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <a href={PATHS.HOME} className="mt-4 text-blue-600 hover:underline">
        Go back home
      </a>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainLayout>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
          <Route path={PATHS.ACTIVITY} element={<ActivityPage />} />
          <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
