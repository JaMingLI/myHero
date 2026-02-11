import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, ProjectsPage, SkillsPage, ActivityPage, ContactPage, NotFoundPage } from "@/pages";
import { MainLayout } from "@/layouts";
import { PATHS } from "./paths";

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-lg">Loading...</div>
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
          <Route path={PATHS.SKILLS} element={<SkillsPage />} />
          <Route path={PATHS.ACTIVITY} element={<ActivityPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Suspense>
  );
}
