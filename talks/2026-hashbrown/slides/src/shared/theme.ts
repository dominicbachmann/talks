export const SECTION_COLORS = {
  systemInstructions: "oklch(51.01% .274 263.83)",
  aiBasics: "oklch(53.18% .28 296.97)",
  resources: "oklch(61.1% .279 314.87)",
  skillet: "oklch(69.02% .277 332.77)",
  streaming: "oklch(64% .26 355)",
  toolCalling: "oklch(59.91% .239 8.14)",
  generativeUi: "oklch(63.32% .24 31.68)",
  jsRuntime: "oklch(70% .2 60)",
} as const;

export const GRADIENT_IMAGE =
  "linear-gradient(135deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68), oklch(70% .2 60))";

export const GRADIENT_LINEAR =
  "linear-gradient(90deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68), oklch(70% .2 60))";

export const gradientText: React.CSSProperties = {
  backgroundImage: GRADIENT_IMAGE,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const MUTED = "oklch(65% .01 0)";
export const BODY = "oklch(80% .01 0)";
