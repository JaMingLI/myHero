import { useEffect, useRef } from "react";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Trap focus within a container when active
 * Useful for modals and dialogs for accessibility
 *
 * @param isActive - Whether the focus trap is active
 * @returns ref to attach to the container element
 */
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
    const firstFocusable = focusableElements[0];

    // Focus the first focusable element
    if (firstFocusable) {
      firstFocusable.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      // Re-query in case DOM changed
      const currentFocusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS);
      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];

      if (!first || !last) return;

      if (event.shiftKey) {
        // Shift + Tab: if on first element, go to last
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last element, go to first
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus to previously focused element
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
