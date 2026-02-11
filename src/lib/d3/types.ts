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
 * Default theme using CSS variables
 */
export const DEFAULT_GLOBE_THEME: GlobeTheme = {
  background: "#0A0F1C", // --color-bg-primary
  graticule: "rgba(30, 41, 59, 0.6)", // --color-bg-secondary with 60% opacity
  voronoiBorder: "#22D3EE", // --color-accent
  airportPoint: "#22D3EE", // --color-accent
};
