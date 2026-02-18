/**
 * D3 types for World Airports Voronoi visualization
 */

/**
 * Airport coordinate data
 */
export interface AirportData {
  /** Longitude */
  longitude: number;
  /** Latitude */
  latitude: number;
  /** Airport name (optional) */
  name?: string;
  /** IATA code (optional) */
  iata?: string;
}

/**
 * Globe theme configuration
 */
export interface GlobeTheme {
  /** Background color */
  background: string;
  /** Graticule (grid lines) color */
  graticule: string;
  /** Voronoi cell border color */
  voronoiBorder: string;
  /** Airport point color */
  airportPoint: string;
  /** Land fill color (optional) */
  landFill?: string;
}

/**
 * Dark theme (default)
 */
export const DARK_GLOBE_THEME: GlobeTheme = {
  background: "#0A0F1C", // --color-bg-primary (dark)
  graticule: "rgba(30, 41, 59, 0.6)", // --color-bg-secondary with 60% opacity
  voronoiBorder: "#22D3EE", // --color-accent (dark)
  airportPoint: "#22D3EE", // --color-accent (dark)
};

/**
 * Light theme - Purple/Violet
 */
export const LIGHT_GLOBE_THEME: GlobeTheme = {
  background: "#F5F3FF", // --color-bg-primary (light) - Purple/Violet
  graticule: "rgba(167, 139, 250, 0.25)", // light purple with 25% opacity
  voronoiBorder: "#7C3AED", // --color-accent (light)
  airportPoint: "#7C3AED", // --color-accent (light)
};

/**
 * Default theme using CSS variables (dark)
 * @deprecated Use DARK_GLOBE_THEME instead
 */
export const DEFAULT_GLOBE_THEME: GlobeTheme = DARK_GLOBE_THEME;

/**
 * Helper to get globe theme based on isDark flag
 */
export const getGlobeTheme = (isDark: boolean): GlobeTheme => {
  return isDark ? DARK_GLOBE_THEME : LIGHT_GLOBE_THEME;
};

/**
 * Projection types for transitions
 */
export type ProjectionType =
  | "orthographic"
  | "stereographic"
  | "mercator"
  | "azimuthalEqualArea";

/**
 * Theme configuration for projection transitions
 */
export interface ProjectionTheme {
  /** Background/sphere fill color */
  background: string;
  /** Graticule (grid lines) color */
  graticule: string;
  /** Sphere outline color */
  sphereOutline: string;
  /** Land fill color */
  landFill: string;
  /** Land stroke color (optional) */
  landStroke?: string;
}

/**
 * Dark theme for projection transitions
 */
export const DARK_PROJECTION_THEME: ProjectionTheme = {
  background: "#0A0F1C",
  graticule: "rgba(30, 41, 59, 0.5)",
  sphereOutline: "rgba(34, 211, 238, 0.3)",
  landFill: "rgba(34, 211, 238, 0.15)",
  landStroke: "rgba(34, 211, 238, 0.4)",
};

/**
 * Light theme for projection transitions
 */
export const LIGHT_PROJECTION_THEME: ProjectionTheme = {
  background: "#F5F3FF",
  graticule: "rgba(167, 139, 250, 0.25)",
  sphereOutline: "rgba(124, 58, 237, 0.3)",
  landFill: "rgba(124, 58, 237, 0.12)",
  landStroke: "rgba(124, 58, 237, 0.35)",
};

/**
 * Helper to get projection theme based on isDark flag
 */
export const getProjectionTheme = (isDark: boolean): ProjectionTheme => {
  return isDark ? DARK_PROJECTION_THEME : LIGHT_PROJECTION_THEME;
};
