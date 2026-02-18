/**
 * Projection Transitions Renderer
 * Creates animated transitions between different map projections
 * with continuous rotation and land rendering
 */
import {
  geoOrthographic,
  geoOrthographicRaw,
  geoStereographic,
  geoStereographicRaw,
  geoMercator,
  geoMercatorRaw,
  geoAzimuthalEqualArea,
  geoAzimuthalEqualAreaRaw,
  geoProjection,
  geoPath,
  geoGraticule10,
  easeCubicInOut,
} from "d3";
import { feature } from "topojson-client";
import type { GeoProjection, GeoPermissibleObjects, GeoRawProjection } from "d3";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { ProjectionTheme, ProjectionType } from "./types";
import { DARK_PROJECTION_THEME } from "./types";

/**
 * Configuration for the projection transitions renderer
 */
export interface ProjectionTransitionsConfig {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Theme configuration */
  theme?: ProjectionTheme;
  /** Land topology data */
  landData: Topology<{ land: GeometryCollection }>;
}

/**
 * Projection transitions renderer instance
 */
export interface ProjectionTransitionsRenderer {
  /** Render at the current state */
  render: (rotation: [number, number, number], transitionProgress: number, fromProjection: ProjectionType, toProjection: ProjectionType) => void;
  /** Clean up resources */
  destroy: () => void;
  /** Update theme */
  setTheme: (theme: ProjectionTheme) => void;
}

/**
 * Projection factory map
 */
const projectionFactories: Record<ProjectionType, () => GeoProjection> = {
  orthographic: geoOrthographic,
  stereographic: geoStereographic,
  mercator: geoMercator,
  azimuthalEqualArea: geoAzimuthalEqualArea,
};

/**
 * Raw projection map (for interpolation)
 * Note: D3's raw projections ARE functions, NOT factory functions.
 * TypeScript types incorrectly claim these return GeoRawProjection,
 * but they ARE GeoRawProjection functions themselves.
 */
const rawProjections: Record<ProjectionType, GeoRawProjection> = {
  orthographic: geoOrthographicRaw as unknown as GeoRawProjection,
  stereographic: geoStereographicRaw as unknown as GeoRawProjection,
  mercator: geoMercatorRaw as unknown as GeoRawProjection,
  azimuthalEqualArea: geoAzimuthalEqualAreaRaw as unknown as GeoRawProjection,
};

/**
 * Create an interpolated projection between two projection types
 */
function createInterpolatedProjection(
  fromType: ProjectionType,
  toType: ProjectionType,
  t: number,
  scale: number,
  translate: [number, number],
  rotation: [number, number, number]
): GeoProjection {
  // Use directly imported raw projections (D3 ESM exports them separately)
  const raw0 = rawProjections[fromType];
  const raw1 = rawProjections[toType];

  // Create custom raw projection that interpolates
  const interpolatedRaw = (lambda: number, phi: number): [number, number] => {
    const p0 = raw0(lambda, phi);
    const p1 = raw1(lambda, phi);
    return [
      p0[0] * (1 - t) + p1[0] * t,
      p0[1] * (1 - t) + p1[1] * t,
    ];
  };

  // Create projection from interpolated raw
  return geoProjection(interpolatedRaw)
    .scale(scale)
    .translate(translate)
    .clipAngle(90)
    .rotate(rotation);
}

/**
 * Creates a projection transitions renderer
 */
export function createProjectionTransitionsRenderer(
  canvas: HTMLCanvasElement,
  config: ProjectionTransitionsConfig
): ProjectionTransitionsRenderer {
  const { width, height, landData, theme: initialTheme = DARK_PROJECTION_THEME } = config;
  let theme = initialTheme;

  const maybeCtx = canvas.getContext("2d");
  if (!maybeCtx) {
    throw new Error("Failed to get 2D context from canvas");
  }
  const ctx: CanvasRenderingContext2D = maybeCtx;

  // Set up high DPI rendering
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  // Calculate scale to fit the canvas with padding
  const scale = Math.min(width, height) / 2.3;

  // Convert TopoJSON to GeoJSON
  const land = feature(landData, landData.objects.land);

  // Create graticule
  const graticule = geoGraticule10();

  // Sphere for background
  const sphere: GeoPermissibleObjects = { type: "Sphere" };

  /**
   * Render the projection at current state
   */
  function render(
    rotation: [number, number, number],
    transitionProgress: number,
    fromProjection: ProjectionType,
    toProjection: ProjectionType
  ): void {
    const easedT = easeCubicInOut(Math.min(1, Math.max(0, transitionProgress)));

    // Create from projection (used when no transition is in progress)
    const fromProj = projectionFactories[fromProjection]()
      .scale(scale)
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .rotate(rotation);

    // Select projection based on transition progress
    let currentProjection: GeoProjection;

    if (transitionProgress <= 0) {
      currentProjection = fromProj;
    } else {
      // Use interpolated projection for smooth transition
      // This includes t >= 1 for visual continuity at transition boundaries
      // Using the same projection type throughout avoids subtle rendering
      // differences between factory-created and custom projections
      currentProjection = createInterpolatedProjection(
        fromProjection,
        toProjection,
        easedT,
        scale,
        [width / 2, height / 2],
        rotation
      );
    }

    // Create path generator
    const path = geoPath(currentProjection, ctx);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw background sphere
    ctx.beginPath();
    path(sphere);
    ctx.fillStyle = theme.background;
    ctx.fill();

    // 2. Draw land
    ctx.beginPath();
    path(land);
    ctx.fillStyle = theme.landFill;
    ctx.fill();
    if (theme.landStroke) {
      ctx.strokeStyle = theme.landStroke;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // 3. Draw graticule
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = theme.graticule;
    ctx.lineWidth = 0.4;
    ctx.stroke();

    // 4. Draw sphere outline
    ctx.beginPath();
    path(sphere);
    ctx.strokeStyle = theme.sphereOutline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /**
   * Clean up resources
   */
  function destroy(): void {
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Update theme
   */
  function setTheme(newTheme: ProjectionTheme): void {
    theme = newTheme;
  }

  return {
    render,
    destroy,
    setTheme,
  };
}
