import { Slide, Code } from "@revealjs/react";
import { blue, gray } from "../../shared/colors";

export function PositionTryCustom() {
  return (
    <Slide>
      <h2>Custom fallback positions</h2>
      <h3
        style={{ color: blue, marginBottom: "0.6em" }}
      >
        <code>@position-try</code> blocks for full control
      </h3>
      <Code language="css" lineNumbers trim>
        {`@position-try --above {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -8px;
}

@position-try --right {
  left: anchor(right);
  top: anchor(center);
  translate: 8px -50%;
}

.tooltip {
  /* Preferred: below. Fallbacks: above, then right */
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
  position-try-fallbacks: --above, --right;
}`}
      </Code>
      <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.6em" }}>
        Each <code>@position-try</code> block is a complete repositioning
        strategy. The browser evaluates them in order and picks the first one
        that fits.
      </p>
    </Slide>
  );
}
