import { useRef, useEffect, useState, useCallback, type MouseEvent } from "react";
import {
  createGlobeRenderer,
  timer,
  type GlobeRenderer,
  type AirportData,
  type GlobeTheme,
  type Timer,
} from "@/lib/d3";

export interface UseD3CanvasOptions {
  /** Canvas width */
  width: number;
  /** Canvas height */
  height: number;
  /** Airport data */
  airports: AirportData[];
  /** Auto-rotate the globe */
  autoRotate?: boolean;
  /** Rotation speed (degrees per millisecond) */
  rotationSpeed?: number;
  /** Theme configuration */
  theme?: GlobeTheme;
  /** Initial rotation [lambda, phi, gamma] */
  initialRotation?: [number, number, number];
  /** Enable drag to rotate (default true) */
  enableDrag?: boolean;
  /** Drag sensitivity multiplier (default 0.5) */
  dragSensitivity?: number;
}

export interface UseD3CanvasReturn {
  /** Canvas ref to attach to the canvas element */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Whether the renderer is ready */
  isReady: boolean;
  /** Pause the rotation animation */
  pauseRotation: () => void;
  /** Resume the rotation animation */
  resumeRotation: () => void;
  /** Whether rotation is currently paused */
  isPaused: boolean;
  /** Mouse down handler for drag rotation */
  onMouseDown: (e: MouseEvent) => void;
  /** Mouse move handler for drag rotation */
  onMouseMove: (e: MouseEvent) => void;
  /** Mouse up handler for drag rotation */
  onMouseUp: () => void;
  /** Whether user is currently dragging */
  isDragging: boolean;
}

/**
 * Hook for managing D3 canvas rendering with globe visualization
 */
export function useD3Canvas({
  width,
  height,
  airports,
  autoRotate = true,
  rotationSpeed = 0.008,
  theme,
  initialRotation = [0, -30, 0],
  enableDrag = true,
  dragSensitivity = 0.5,
}: UseD3CanvasOptions): UseD3CanvasReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<GlobeRenderer | null>(null);
  const timerRef = useRef<Timer | null>(null);
  const rotationRef = useRef<[number, number, number]>([...initialRotation]);
  const isPausedRef = useRef(false);

  // Drag state refs
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartRotationRef = useRef<[number, number, number]>([...initialRotation]);
  const wasAutoRotatingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize renderer
  useEffect(() => {
    if (airports.length === 0) return;

    // Use requestAnimationFrame to defer initialization by one frame
    // This allows the canvas to be properly mounted and animations to complete
    const frameId = requestAnimationFrame(() => {
      const canvas = canvasRef.current; // Get latest ref inside callback to avoid stale closure
      if (!canvas) return;

      try {
        rendererRef.current = createGlobeRenderer(canvas, {
          width,
          height,
          airports,
          theme,
          initialRotation,
        });

        // Initial render
        rendererRef.current.render(rotationRef.current);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize globe renderer:", error);
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
  }, [width, height, airports, theme, initialRotation]);

  // Animation loop
  useEffect(() => {
    if (!autoRotate || !isReady || !rendererRef.current) return;

    timerRef.current = timer((elapsed) => {
      if (!isPausedRef.current && rendererRef.current) {
        rotationRef.current = [
          initialRotation[0] + elapsed * rotationSpeed,
          initialRotation[1],
          initialRotation[2],
        ];
        rendererRef.current.render(rotationRef.current);
      }
    });

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
    };
  }, [autoRotate, isReady, rotationSpeed, initialRotation]);

  const pauseRotation = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const resumeRotation = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
  }, []);

  // Drag handlers
  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!enableDrag || !rendererRef.current) return;

      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      dragStartRotationRef.current = [...rotationRef.current];

      // Remember if auto-rotation was active and pause it
      wasAutoRotatingRef.current = autoRotate && !isPausedRef.current;
      if (wasAutoRotatingRef.current) {
        isPausedRef.current = true;
        setIsPaused(true);
      }
    },
    [enableDrag, autoRotate]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current || !dragStartRef.current || !rendererRef.current)
        return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // Convert pixel delta to rotation degrees
      // deltaX affects lambda (longitude), deltaY affects phi (latitude)
      const newLambda = dragStartRotationRef.current[0] + deltaX * dragSensitivity;
      const newPhi = Math.max(
        -90,
        Math.min(90, dragStartRotationRef.current[1] - deltaY * dragSensitivity)
      );

      rotationRef.current = [newLambda, newPhi, dragStartRotationRef.current[2]];
      rendererRef.current.render(rotationRef.current);
    },
    [dragSensitivity]
  );

  const onMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    dragStartRef.current = null;

    // Resume auto-rotation if it was active before drag
    if (wasAutoRotatingRef.current) {
      isPausedRef.current = false;
      setIsPaused(false);
    }
  }, []);

  return {
    canvasRef,
    isReady,
    pauseRotation,
    resumeRotation,
    isPaused,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    isDragging,
  };
}
