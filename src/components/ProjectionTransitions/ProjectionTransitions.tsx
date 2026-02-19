import { useMemo, useRef, useState, useEffect } from "react";
import { useProjectionTransitions } from "@/hooks/useProjectionTransitions";
import { useContainerSize } from "@/hooks";
import { cn } from "@/utils";
import type { ProjectionTheme } from "@/lib/d3";
import type { Topology, GeometryCollection } from "topojson-specification";

// Import land data statically
import landDataJson from "@/assets/data/land-110m.json";

export interface ProjectionTransitionsProps {
  /** Additional CSS classes */
  className?: string;
  /** Custom theme (optional) */
  theme?: ProjectionTheme;
  /** Enable auto-animation (default true) */
  autoAnimate?: boolean;
}

/**
 * ProjectionTransitions - A 3D globe visualization showing smooth transitions
 * between different map projections with rotating Earth
 */
export function ProjectionTransitions({
  className = "",
  theme,
  autoAnimate = true,
}: ProjectionTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const [landData, setLandData] = useState<Topology<{ land: GeometryCollection }> | null>(null);

  // Load land data
  useEffect(() => {
    // Cast the imported JSON to the correct type
    setLandData(landDataJson as unknown as Topology<{ land: GeometryCollection }>);
  }, []);

  // Use the smaller dimension to keep the globe circular
  const size = Math.min(width, height) || 110;

  // Stabilize initialRotation reference
  const initialRotation = useMemo<[number, number, number]>(
    () => [0, -20, 0],
    []
  );

  const { canvasRef, isReady } = useProjectionTransitions({
    width: size,
    height: size,
    landData,
    autoAnimate,
    theme,
    initialRotation,
  });

  return (
    <div ref={containerRef} className={cn("relative", className)}>
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
        className={cn(
          "relative z-10 transition-opacity duration-300",
          isReady ? "opacity-100" : "opacity-0"
        )}
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
          <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
