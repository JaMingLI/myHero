import { useRef, useEffect, useState, useCallback } from "react";
import {
  createProjectionTransitionsRenderer,
  timer,
  type ProjectionTransitionsRenderer,
  type Timer,
  type ProjectionTheme,
  type ProjectionType,
} from "@/lib/d3";
import type { Topology, GeometryCollection } from "topojson-specification";

/**
 * Animation parameters
 */
const ROTATION_SPEED = 0.008; // degrees per ms
const PROJECTION_SWITCH_INTERVAL = 4000; // ms
const TRANSITION_DURATION = 1500; // ms

/**
 * Projection sequence for cycling
 */
const PROJECTION_SEQUENCE: ProjectionType[] = [
  "orthographic",
  "stereographic",
  "azimuthalEqualArea",
  "mercator",
];

export interface UseProjectionTransitionsOptions {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Land topology data */
  landData: Topology<{ land: GeometryCollection }> | null;
  /** Auto-animate the globe */
  autoAnimate?: boolean;
  /** Theme configuration */
  theme?: ProjectionTheme;
  /** Initial rotation [lambda, phi, gamma] */
  initialRotation?: [number, number, number];
}

export interface UseProjectionTransitionsReturn {
  /** Canvas ref to attach to the canvas element */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Whether the renderer is ready */
  isReady: boolean;
  /** Pause the animation */
  pauseAnimation: () => void;
  /** Resume the animation */
  resumeAnimation: () => void;
  /** Whether animation is currently paused */
  isPaused: boolean;
  /** Current projection type */
  currentProjection: ProjectionType;
}

/**
 * Hook for managing D3 projection transitions animation
 */
export function useProjectionTransitions({
  width,
  height,
  landData,
  autoAnimate = true,
  theme,
  initialRotation = [0, -20, 0],
}: UseProjectionTransitionsOptions): UseProjectionTransitionsReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<ProjectionTransitionsRenderer | null>(null);
  const timerRef = useRef<Timer | null>(null);
  const rotationRef = useRef<[number, number, number]>([...initialRotation]);
  const isPausedRef = useRef(false);

  // Animation state refs
  const projectionIndexRef = useRef(0);
  const transitionProgressRef = useRef(0);
  const lastSwitchTimeRef = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentProjection, setCurrentProjection] = useState<ProjectionType>(
    PROJECTION_SEQUENCE[0]
  );

  // Initialize renderer
  useEffect(() => {
    if (!landData) return;

    const frameId = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        rendererRef.current = createProjectionTransitionsRenderer(canvas, {
          width,
          height,
          landData,
          theme,
        });

        // Initial render
        const fromProj = PROJECTION_SEQUENCE[0];
        const toProj = PROJECTION_SEQUENCE[0];
        rendererRef.current.render(rotationRef.current, 0, fromProj, toProj);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize projection transitions renderer:", error);
      }
    });

    return () => {
      cancelAnimationFrame(frameId);

      if (rendererRef.current) {
        rendererRef.current.destroy();
        rendererRef.current = null;
      }
      setIsReady(false);
    };
  }, [width, height, landData, theme]);

  // Update theme when it changes
  useEffect(() => {
    if (rendererRef.current && theme) {
      rendererRef.current.setTheme(theme);
    }
  }, [theme]);

  // Animation loop
  useEffect(() => {
    if (!autoAnimate || !isReady || !rendererRef.current) return;

    lastSwitchTimeRef.current = 0;

    timerRef.current = timer((elapsed) => {
      if (isPausedRef.current || !rendererRef.current) return;

      // Initialize last switch time
      if (lastSwitchTimeRef.current === 0) {
        lastSwitchTimeRef.current = elapsed;
      }

      // Update rotation
      rotationRef.current = [
        initialRotation[0] + elapsed * ROTATION_SPEED,
        initialRotation[1],
        initialRotation[2],
      ];

      // Calculate time since last projection switch
      const timeSinceSwitch = elapsed - lastSwitchTimeRef.current;

      let transitionProgress = 0;

      if (timeSinceSwitch >= PROJECTION_SWITCH_INTERVAL) {
        // Start transition
        const transitionTime = timeSinceSwitch - PROJECTION_SWITCH_INTERVAL;
        transitionProgress = Math.min(1, transitionTime / TRANSITION_DURATION);

        if (transitionProgress >= 1) {
          // Transition complete, move to next projection
          projectionIndexRef.current =
            (projectionIndexRef.current + 1) % PROJECTION_SEQUENCE.length;
          lastSwitchTimeRef.current = elapsed;
          transitionProgress = 0;
          setCurrentProjection(PROJECTION_SEQUENCE[projectionIndexRef.current]);
        }
      }

      // Determine current projection state AFTER potential index update
      // This ensures fromProj is the correct projection after transition completes
      const currentIdx = projectionIndexRef.current;
      const nextIdx = (currentIdx + 1) % PROJECTION_SEQUENCE.length;
      const fromProj = PROJECTION_SEQUENCE[currentIdx];
      const toProj = PROJECTION_SEQUENCE[nextIdx];

      transitionProgressRef.current = transitionProgress;

      // Render
      rendererRef.current.render(
        rotationRef.current,
        transitionProgress,
        fromProj,
        transitionProgress > 0 ? toProj : fromProj
      );
    });

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
    };
  }, [autoAnimate, isReady, initialRotation]);

  const pauseAnimation = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resumeAnimation = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
  }, []);

  return {
    canvasRef,
    isReady,
    pauseAnimation,
    resumeAnimation,
    isPaused,
    currentProjection,
  };
}
