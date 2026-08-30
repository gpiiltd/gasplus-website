import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element has scrolled into the viewport.
 * Fires once and disconnects — good for one-time "fade in on scroll" reveals.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.3 },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
