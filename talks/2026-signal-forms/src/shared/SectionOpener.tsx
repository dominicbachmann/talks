import { Slide } from "@revealjs/react";

interface SectionOpenerProps {
  number: string;
  title: string;
  color: string;
}

export function SectionOpener({ number, title, color }: SectionOpenerProps) {
  return (
    <Slide>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "#111",
        }}
      >
        <span
          style={{
            fontSize: "5em",
            fontWeight: 800,
            color,
            opacity: 0.3,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {number}
        </span>
        <h2
          style={{
            fontSize: "2.8em",
            fontWeight: 700,
            color,
            margin: "0.1em 0 0",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 120,
            height: 3,
            borderRadius: 2,
            marginTop: "0.8em",
            background: color,
          }}
        />
      </div>
    </Slide>
  );
}
