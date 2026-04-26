import { Slide } from "@revealjs/react";
import { SECTION_COLORS, GRADIENT_LINEAR } from "./shared/theme";

const sections = [
  "System Instructions",
  "AI Basics",
  "Resources",
  "Skillet Schema",
  "Streaming",
  "Tool Calling",
  "Generative UI",
  "JavaScript Runtime",
];

const colors = [
  SECTION_COLORS.systemInstructions,
  SECTION_COLORS.aiBasics,
  SECTION_COLORS.resources,
  SECTION_COLORS.skillet,
  SECTION_COLORS.streaming,
  SECTION_COLORS.toolCalling,
  SECTION_COLORS.generativeUi,
  SECTION_COLORS.jsRuntime,
];

const css = `
.toc-item {
  font-size: 1.1em;
  padding: 0.12em 0;
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
}`,
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
            backgroundImage: GRADIENT_LINEAR,
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
