import type { ReactNode } from "react";
import { Slide } from "@revealjs/react";
import { green, darkBg, border } from "./colors";

interface DemoSlideProps {
  title: ReactNode;
  src: string;
  color?: string;
}

export function DemoSlide({ title, src, color = green }: DemoSlideProps) {
  return (
    <Slide>
      <h3 style={{ color, marginBottom: "0.4em" }}>{title}</h3>
      <iframe
        src={src}
        style={{
          width: "100%",
          height: "520px",
          border: `1px solid ${border}`,
          borderRadius: "6px",
          background: darkBg,
        }}
      />
    </Slide>
  );
}
