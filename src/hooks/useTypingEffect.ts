import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  /** Typing speed in milliseconds per character */
  speed?: number;
  /** Delay before starting the typing effect */
  delay?: number;
}

interface UseTypingEffectReturn {
  /** Current displayed text */
  displayText: string;
  /** Whether the typing animation is complete */
  isComplete: boolean;
}

/**
 * Custom hook for typewriter text effect
 * @param text - The full text to type out
 * @param options - Configuration options
 */
export function useTypingEffect(
  text: string,
  options: UseTypingEffectOptions = {}
): UseTypingEffectReturn {
  const { speed = 80, delay = 0 } = options;
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setInterval>;

    // Delay before starting
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
}
