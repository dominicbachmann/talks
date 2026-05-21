export const SECTION_COLORS = {
  stringlyTyped: "oklch(60% .25 25)",
  theInsight: "oklch(72% .2 80)",
  theResult: "oklch(65% .22 145)",
  setup: "oklch(65% .18 210)",
  underTheHood: "oklch(58% .27 285)",
} as const;

export const GRADIENT_IMAGE =
  "linear-gradient(135deg, oklch(60% .25 25), oklch(72% .2 80), oklch(65% .22 145), oklch(65% .18 210), oklch(58% .27 285))";

export const GRADIENT_LINEAR =
  "linear-gradient(90deg, oklch(60% .25 25), oklch(72% .2 80), oklch(65% .22 145), oklch(65% .18 210), oklch(58% .27 285))";

export const gradientText: React.CSSProperties = {
  backgroundImage: GRADIENT_IMAGE,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const MUTED = "oklch(65% .01 0)";
export const BODY = "oklch(80% .01 0)";
