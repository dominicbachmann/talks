import type { CSSProperties, ReactNode } from "react";
import { Fragment } from "@revealjs/react";

interface BulletPointProps {
  color: string;
  label: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}

export function BulletPoint({
  color,
  label,
  children,
  style,
}: BulletPointProps) {
  return (
    <Fragment animation="fade-up">
      <p style={style}>
        <strong style={{ color }}>{label}</strong>{" "}
        {children}
      </p>
    </Fragment>
  );
}
