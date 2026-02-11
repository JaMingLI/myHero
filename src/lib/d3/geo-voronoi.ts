/**
 * Globe Renderer using D3 geo voronoi
 * Creates a 3D orthographic projection of Earth with Voronoi tessellation
 */
import { geoOrthographic, geoPath, geoGraticule10 } from "d3";
import { geoVoronoi } from "d3-geo-voronoi";
import type { GeoPermissibleObjects } from "d3";
import type { AirportData, GlobeTheme } from "./types";
import { DEFAULT_GLOBE_THEME } from "./types";

/**
 * Configuration for the globe renderer
 */
export interface GlobeConfig {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Airport data points */
  airports: AirportData[];
  /** Theme configuration */
  theme?: GlobeTheme;
  /** Initial rotation [lambda, phi, gamma] */
  initialRotation?: [number, number, number];
}

/**
 * Globe renderer instance
 */
export interface GlobeRenderer {
  /** Render the globe with the given rotation */
  render: (rotation: [number, number, number]) => void;
  /** Clean up resources */
  destroy: () => void;
  /** Get current projection scale */
  getScale: () => number;
}

/**
 * Creates a globe renderer for the given canvas
 */
export function createGlobeRenderer(
  canvas: HTMLCanvasElement,
  config: GlobeConfig
): GlobeRenderer {
  const { width, height, airports, theme = DEFAULT_GLOBE_THEME } = config;

  const maybeCtx = canvas.getContext("2d");
  if (!maybeCtx) {
    throw new Error("Failed to get 2D context from canvas");
  }
  // Store in a const that TypeScript knows is non-null
  const ctx: CanvasRenderingContext2D = maybeCtx;

  // Set up high DPI rendering
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  // Calculate scale to fit the canvas with padding
  const scale = Math.min(width, height) / 2.2;

  // Create orthographic projection
  const projection = geoOrthographic()
    .scale(scale)
    .translate([width / 2, height / 2])
    .clipAngle(90);

  // Create path generator
  const path = geoPath(projection, ctx);

  // Create graticule (grid lines)
  const graticule = geoGraticule10();

  // Convert airports to GeoJSON points for Voronoi
  const airportPoints: [number, number][] = airports.map((a) => [
    a.longitude,
    a.latitude,
  ]);

  // Create Voronoi generator
  const voronoi = geoVoronoi(airportPoints);
  const voronoiPolygons = voronoi.polygons();

  // Create sphere for outline
  const sphere: GeoPermissibleObjects = { type: "Sphere" };

  /**
   * Render the globe with the given rotation
   */
  function render(rotation: [number, number, number]): void {
    projection.rotate(rotation);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background sphere
    ctx.beginPath();
    path(sphere);
    ctx.fillStyle = theme.background;
    ctx.fill();

    // Draw graticule (grid lines)
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = theme.graticule;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Draw Voronoi cells
    if (voronoiPolygons && voronoiPolygons.features) {
      voronoiPolygons.features.forEach((feature: GeoPermissibleObjects) => {
        ctx.beginPath();
        path(feature);
        ctx.strokeStyle = theme.voronoiBorder;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    }

    // Draw airport points
    airports.forEach((airport) => {
      const coords = projection([airport.longitude, airport.latitude]);
      if (coords) {
        // Check if point is on visible hemisphere
        const distance = Math.sqrt(
          Math.pow(coords[0] - width / 2, 2) +
            Math.pow(coords[1] - height / 2, 2)
        );
        if (distance <= scale) {
          ctx.beginPath();
          ctx.arc(coords[0], coords[1], 1.5, 0, 2 * Math.PI);
          ctx.fillStyle = theme.airportPoint;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    });

    // Draw sphere outline
    ctx.beginPath();
    path(sphere);
    ctx.strokeStyle = theme.voronoiBorder;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  /**
   * Clean up resources
   */
  function destroy(): void {
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Get current projection scale
   */
  function getScale(): number {
    return scale;
  }

  return {
    render,
    destroy,
    getScale,
  };
}
