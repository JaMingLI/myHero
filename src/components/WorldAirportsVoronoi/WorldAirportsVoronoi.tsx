import { useMemo, useRef } from "react";
import { useD3Canvas, useContainerSize } from "@/hooks";
import type { GlobeTheme, AirportData } from "@/lib/d3";
import airportsData from "@/assets/data/airports.json";

export interface WorldAirportsVoronoiProps {
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom theme (optional) */
  theme?: GlobeTheme;
  /** Enable drag to rotate (default true) */
  enableDrag?: boolean;
}

/**
 * WorldAirportsVoronoi - A 3D globe visualization showing Voronoi tessellation
 * of world airports using orthographic projection
 */
export function WorldAirportsVoronoi({
  autoRotate = true,
  className = "",
  theme,
  enableDrag = true,
}: WorldAirportsVoronoiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(containerRef);

  // Memoize airports data to prevent unnecessary re-renders
  const airports: AirportData[] = useMemo(() => airportsData, []);

  // Use the smaller dimension to keep the globe circular
  const size = Math.min(width, height) || 280;

  // Stabilize initialRotation reference to prevent useEffect re-runs
  const initialRotation = useMemo<[number, number, number]>(
    () => [0, -30, 0],
    []
  );

  const {
    canvasRef,
    isReady,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isDragging,
  } = useD3Canvas({
    width: size,
    height: size,
    airports,
    autoRotate,
    theme,
    rotationSpeed: 0.008,
    initialRotation,
    enableDrag,
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Glow effect container */}
      <div
        className="absolute globe-glow rounded-full"
        style={{
          width: size,
          height: size,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Canvas container */}
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`relative z-10 transition-opacity duration-300 ${
          isReady ? "opacity-100" : "opacity-0"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          width: size,
          height: size,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Loading state */}
      {!isReady && (
        <div
          className="absolute flex items-center justify-center bg-[var(--color-bg-primary)] rounded-full"
          style={{
            width: size,
            height: size,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
