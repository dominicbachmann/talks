import type { ReactNode } from "react";
import { Slide } from "@revealjs/react";
import { gray, blue, darkBg } from "./colors";

interface SectionTitleProps {
  title: ReactNode;
  subtitle: ReactNode;
  baseline: ReactNode;
  baselineColor?: string;
}

export function SectionTitle({
  title,
  subtitle,
  baseline,
  baselineColor = blue,
}: SectionTitleProps) {
  return (
    <Slide backgroundColor={darkBg}>
      <h1 style={{ fontSize: "2.5em", marginBottom: "0.3em" }}>{title}</h1>
      <p style={{ fontSize: "1.1em", color: gray }}>{subtitle}</p>
      <p style={{ fontSize: "0.8em", color: baselineColor, marginTop: "1.5em" }}>
        {baseline}
      </p>
    </Slide>
  );
}
