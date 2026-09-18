import { Children } from "react";
import { useInView } from "./useInView";

// ─────────────────────────────────────────────
// Shared types
// ─────────────────────────────────────────────

type Direction = "up" | "down" | "left" | "right" | "none";

const directionMap: Record<Direction, string> = {
  up:    "translateY(VARpx)",
  down:  "translateY(-VARpx)",
  left:  "translateX(VARpx)",
  right: "translateX(-VARpx)",
  none:  "translateY(0)",
};

// ─────────────────────────────────────────────
// FadeIn
// ─────────────────────────────────────────────

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  distance = 28,
  threshold = 0.15,
  once = true,
  className = "",
}: FadeInProps) {
  const [ref, visible] = useInView({ threshold, once });
  const transform = directionMap[direction].replace("VAR", String(distance));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : transform,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// StaggerChildren
// ─────────────────────────────────────────────

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  childClassName?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  duration = 600,
  direction = "up",
  distance = 24,
  threshold = 0.1,
  once = true,
  className = "",
  childClassName = "",
}: StaggerChildrenProps) {
  const [ref, triggered] = useInView({ threshold, once });
  const hiddenTransform = directionMap[direction].replace("VAR", String(distance));

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className={childClassName}
          style={{
            opacity: triggered ? 1 : 0,
            transform: triggered ? "translate(0,0)" : hiddenTransform,
            transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * staggerDelay}ms,
                         transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * staggerDelay}ms`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ScaleIn
// ─────────────────────────────────────────────

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 500,
  from = 0.92,
  threshold = 0.15,
  once = true,
  className = "",
}: ScaleInProps) {
  const [ref, visible] = useInView({ threshold, once });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : `scale(${from})`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}