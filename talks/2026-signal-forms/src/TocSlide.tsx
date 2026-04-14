import { Slide } from "@revealjs/react";

const sections = [
  "Why Signal Forms",
  "Form Models",
  "Form Model Design",
  "Field State Management",
  "Validation",
  "Form Logic",
  "Custom Controls",
];

const colors = [
  "oklch(51.01% .274 263.83)",
  "oklch(52.1% .277 280.4)",
  "oklch(53.18% .28 296.97)",
  "oklch(61.1% .279 314.87)",
  "oklch(69.02% .277 332.77)",
  "oklch(59.91% .239 8.14)",
  "oklch(63.32% .24 31.68)",
];

const css = `
.toc-item {
  font-size: 1.15em;
  padding: 0.15em 0;
  display: flex;
  align-items: center;
  gap: 0.6em;
  color: oklch(65% .01 0);
  opacity: 0.5;
  font-weight: 400;
  transition: all 0.3s ease;
}
.toc-item .toc-num {
  font-weight: 700;
  font-size: 0.85em;
  font-variant-numeric: tabular-nums;
  min-width: 1.4em;
  color: oklch(65% .01 0);
}
.toc-item.visible {
  opacity: 0.5;
}
${sections
  .map(
    (_, i) => `
.toc-item.current-fragment:nth-child(${i + 1}) {
  opacity: 1;
  font-weight: 600;
  color: ${colors[i]};
}
.toc-item.current-fragment:nth-child(${i + 1}) .toc-num {
  color: ${colors[i]};
}`
  )
  .join("\n")}
`;

export function TocSlide() {
  return (
    <Slide>
      <style>{css}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          background: "#111",
          padding: "0 10%",
        }}
      >
        <h2
          style={{
            fontSize: "2em",
            fontWeight: 700,
            backgroundImage:
              "linear-gradient(90deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 0 0.8em 0",
          }}
        >
          Content
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
          {sections.map((section, i) => (
            <li key={i} className="toc-item fragment" data-fragment-index={i}>
              <span className="toc-num">{String(i + 1).padStart(2, "0")}</span>
              {section}
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
