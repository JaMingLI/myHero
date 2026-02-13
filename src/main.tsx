import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@/app";
import { AppRoutes } from "@/router/routes";

// Initialize i18n
import "@/i18n";

// Global styles
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </StrictMode>
);
