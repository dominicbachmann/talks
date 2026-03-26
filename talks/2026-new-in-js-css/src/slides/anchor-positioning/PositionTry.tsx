import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function PositionTry() {
  return (
    <Slide>
      <h2>
        <code>position-try</code>: automatic overflow handling
      </h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.6em" }}>
        The browser flips or shifts the tooltip when it would overflow the
        viewport
      </p>
      <Code language="css" lineNumbers="1-7|9-14" trim>
        {`.tooltip {
  position: absolute;
  position-anchor: --trigger;

  /* Preferred: below */
  top: anchor(bottom);
  left: anchor(center);

  /* If it overflows, try these fallbacks */
  position-try-fallbacks:
    flip-block,           /* flip above */
    flip-inline,          /* flip to the side */
    flip-block flip-inline; /* flip diagonally */
}`}
      </Code>
    </Slide>
  );
}
