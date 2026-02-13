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
 * Light theme - Deeper Rose
 */
export const LIGHT_GLOBE_THEME: GlobeTheme = {
  background: "#F5EFEF", // --color-bg-primary (light) - Deeper Rose
  graticule: "rgba(113, 113, 122, 0.25)", // zinc-500 with 25% opacity
  voronoiBorder: "#0891B2", // --color-accent (light)
  airportPoint: "#0891B2", // --color-accent (light)
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
