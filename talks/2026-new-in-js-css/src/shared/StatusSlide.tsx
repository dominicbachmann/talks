import type { ReactNode } from "react";
import { Slide } from "@revealjs/react";

interface StatusSlideProps {
  title?: ReactNode;
  children: ReactNode;
}

export function StatusSlide({
  title = "Status & key takeaways",
  children,
}: StatusSlideProps) {
  return (
    <Slide>
      <h2>{title}</h2>
      <div style={{ textAlign: "left", fontSize: "0.85em", marginTop: "1em" }}>
        {children}
      </div>
    </Slide>
  );
}
