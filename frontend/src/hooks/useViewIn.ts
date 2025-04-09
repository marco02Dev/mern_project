import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}


export const useInView = (options: UseInViewOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      options
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options, isInView]);

  return [ref, isInView] as const;
};

// threshold:
// threshold: 0 — Triggered as soon as even a small part of the element is visible.
// threshold: 1 — Triggered when the element is fully visible.
// threshold: 0.5 — Triggered when at least 50% of the element is visible.
