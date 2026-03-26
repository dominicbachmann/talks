import { Code, Fragment, Slide } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function TopLayerStyling() {
  return (
    <Slide>
      <h2>Top layer &amp; styling</h2>
      <Code language="css" lineNumbers="1-6|8-12|14-19" trim>
        {`/* Style the popover itself */
[popover] {
  padding: 16px 24px;
  border-radius: 8px;
  background: #21262d;
  border: 1px solid #30363d;
}

/* Style the open state */
[popover]:popover-open {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* Style the backdrop — only appears for top layer */
[popover]::backdrop {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

/* Anchor to trigger with anchor positioning */
[popover] {
  position-anchor: --trigger;
  top: anchor(bottom);
  left: anchor(center);
}`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.6em" }}>
          Popovers render in the{" "}
          <strong style={{ color: "#e6edf3" }}>top layer</strong> — above all
          stacking contexts, <code>overflow: hidden</code>, and{" "}
          <code>z-index</code> values.
          The <code>::backdrop</code> pseudo-element sits between the popover
          and the rest of the page.
        </p>
      </Fragment>
    </Slide>
  );
}
