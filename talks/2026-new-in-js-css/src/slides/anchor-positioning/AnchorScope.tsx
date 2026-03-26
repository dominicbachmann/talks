import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function AnchorScope() {
  return (
    <Slide>
      <h2>
        <code>anchor-scope</code>: isolating anchors in components
      </h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.6em" }}>
        Prevent anchor names from leaking across component boundaries
      </p>
      <Code language="css" lineNumbers trim>
        {`/* Without anchor-scope, --trigger anchors could collide
   across multiple card components on the same page */

.card {
  anchor-scope: --trigger;
  /* Now --trigger only resolves within this .card */
}

.card .trigger { anchor-name: --trigger; }
.card .tip {
  position-anchor: --trigger;
  top: anchor(bottom);
}`}
      </Code>
    </Slide>
  );
}
