import { Slide, Code } from "@revealjs/react";
import { green } from "../../shared/colors";

export function CssAnchoring() {
  return (
    <Slide>
      <h2>The CSS way: anchor positioning</h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        Three properties, zero JavaScript
      </h3>
      <Code language="css" lineNumbers="1-4|6-15" trim>
        {`/* 1. Name the anchor */
.trigger {
  anchor-name: --my-tooltip;
}

/* 2. Position relative to it */
.tooltip {
  position: absolute;
  position-anchor: --my-tooltip;

  /* Place below the anchor, centered */
  top: calc(anchor(bottom) + 8px);
  left: anchor(center);
  transform: translateX(-50%);
}`}
      </Code>
    </Slide>
  );
}
