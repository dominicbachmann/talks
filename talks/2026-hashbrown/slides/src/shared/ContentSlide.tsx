import { type ReactNode } from "react";
import { Slide } from "@revealjs/react";
import { MUTED } from "./theme";

interface ContentSlideProps {
  title: ReactNode;
  subhead?: ReactNode;
  color: string;
  children: ReactNode;
  titleSize?: string;
  padding?: string;
}

export function ContentSlide({
  title,
  subhead,
  color,
  children,
  titleSize = "1.6em",
  padding = "0 10%",
}: ContentSlideProps) {
  return (
    <Slide>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          background: "#111",
          padding,
          textAlign: "left",
        }}
      >
        <h2
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            color,
            margin: "0 0 0.3em",
          }}
        >
          {title}
        </h2>
        {subhead ? (
          <p
            style={{
              fontSize: "0.9em",
              color: MUTED,
              margin: "0 0 1em",
              lineHeight: 1.5,
            }}
          >
            {subhead}
          </p>
        ) : (
          <div style={{ height: "0.6em" }} />
        )}
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </Slide>
  );
}
