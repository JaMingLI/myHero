/**
 * Type declarations for d3-geo-voronoi
 */
declare module "d3-geo-voronoi" {
  import type { GeoPermissibleObjects } from "d3";

  export interface GeoVoronoiPolygons {
    type: "FeatureCollection";
    features: GeoPermissibleObjects[];
  }

  export interface GeoVoronoi {
    (points: [number, number][]): {
      polygons(): GeoVoronoiPolygons;
      triangles(): GeoPermissibleObjects;
      links(): GeoPermissibleObjects;
      mesh(): GeoPermissibleObjects;
      cellMesh(): GeoPermissibleObjects;
      find(x: number, y: number): number;
      hull(): GeoPermissibleObjects;
    };
  }

  export const geoVoronoi: GeoVoronoi;
}
