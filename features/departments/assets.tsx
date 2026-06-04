import type { CSSProperties } from "react";

/**
 * A diagonal gradient derived from a single department color.
 * The second stop is a relative OKLCH color of the base — slightly lighter and
 * hue-shifted — so any chosen hex produces a lively two-tone gradient
 * (mirroring the old from-600 → to-500/400 look) without hardcoded palettes.
 */
export const departmentGradient = (color: string) =>
  `linear-gradient(to bottom right, ${color}, oklch(from ${color} calc(l + 0.08) c calc(h - 25)))`;

/** Inline style applying {@link departmentGradient} as a background image. */
export const departmentGradientStyle = (color: string): CSSProperties => ({
  backgroundImage: departmentGradient(color),
});
