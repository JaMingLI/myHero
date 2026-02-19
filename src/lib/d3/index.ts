/**
 * D3 wrapper
 * Re-exports D3 utilities for geo visualization
 */

// D3 core exports (includes d3-geo)
export { select, json, timer, geoOrthographic, geoPath, geoGraticule10 } from "d3";
export type { Timer, GeoProjection, GeoPath, GeoPermissibleObjects } from "d3";

// D3-geo-voronoi exports
export { geoVoronoi } from "d3-geo-voronoi";

// Custom globe renderer
export { createGlobeRenderer } from "./geo-voronoi";
export type { GlobeConfig, GlobeRenderer } from "./geo-voronoi";

// Projection transitions renderer
export { createProjectionTransitionsRenderer } from "./projection-transitions";
export type {
  ProjectionTransitionsConfig,
  ProjectionTransitionsRenderer,
} from "./projection-transitions";

// Types
export {
  DEFAULT_GLOBE_THEME,
  DARK_GLOBE_THEME,
  LIGHT_GLOBE_THEME,
  getGlobeTheme,
  DARK_PROJECTION_THEME,
  LIGHT_PROJECTION_THEME,
  getProjectionTheme,
} from "./types";
export type {
  AirportData,
  GlobeTheme,
  ProjectionTheme,
  ProjectionType,
} from "./types";
