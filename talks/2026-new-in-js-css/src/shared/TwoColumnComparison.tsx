import type { CSSProperties, ReactNode } from "react";

interface Column {
  title: ReactNode;
  color: string;
  children: ReactNode;
}

interface TwoColumnComparisonProps {
  left: Column;
  right: Column;
  gap?: string;
  marginTop?: string;
  fontSize?: string;
  headingMarginBottom?: string;
}

export function TwoColumnComparison({
  left,
  right,
  gap = "1.5em",
  marginTop = "0.6em",
  fontSize,
  headingMarginBottom = "0.4em",
}: TwoColumnComparisonProps) {
  const containerStyle: CSSProperties = {
    display: "flex",
    gap,
    marginTop,
    ...(fontSize && { fontSize }),
  };
  const columnStyle: CSSProperties = { flex: 1, textAlign: "left" };
  const headingStyle = (color: string): CSSProperties => ({
    color,
    marginBottom: headingMarginBottom,
  });

  return (
    <div style={containerStyle}>
      <div style={columnStyle}>
        <h3 style={headingStyle(left.color)}>{left.title}</h3>
        {left.children}
      </div>
      <div style={columnStyle}>
        <h3 style={headingStyle(right.color)}>{right.title}</h3>
        {right.children}
      </div>
    </div>
  );
}
