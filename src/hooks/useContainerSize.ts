import { useState, useEffect, type RefObject } from "react";

export interface ContainerSize {
  width: number;
  height: number;
}

/**
 * Hook to monitor container element size using ResizeObserver
 * @param containerRef - Reference to the container element
 * @returns Current container dimensions { width, height }
 */
export function useContainerSize(
  containerRef: RefObject<HTMLElement | null>
): ContainerSize {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize with current size
    const { width, height } = container.getBoundingClientRect();
    setSize({ width, height });

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return size;
}
