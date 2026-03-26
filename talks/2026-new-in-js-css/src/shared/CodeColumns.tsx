import type { CSSProperties, ReactNode } from "react";

interface CodeColumnsProps {
  children: ReactNode;
  gap?: string;
  marginTop?: string;
}

export function CodeColumns({
  children,
  gap = "1.2em",
  marginTop = "0.6em",
}: CodeColumnsProps) {
  return (
    <div style={{ display: "flex", gap, marginTop }}>
      {children}
    </div>
  );
}

interface CodeColumnProps {
  title: ReactNode;
  color: string;
  children: ReactNode;
  fontSize?: string;
  marginBottom?: string;
}

export function CodeColumn({
  title,
  color,
  children,
  fontSize,
  marginBottom = "0.3em",
}: CodeColumnProps) {
  const headingStyle: CSSProperties = {
    color,
    marginBottom,
    ...(fontSize && { fontSize }),
  };

  return (
    <div style={{ flex: 1 }}>
      <h4 style={headingStyle}>{title}</h4>
      {children}
    </div>
  );
}
