import { Code, Slide } from "@revealjs/react";
import { blue } from "../../shared/colors";

export function PopoverActions() {
  return (
    <Slide>
      <h2>Controlling popovers</h2>
      <div style={{ display: "flex", gap: "1.5em" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: blue, marginBottom: "0.4em" }}>
            Declarative (HTML)
          </h3>
          <Code language="html" trim>
            {`<!-- Default: toggle -->
<button popovertarget="p1">
  Toggle
</button>

<!-- Explicit actions -->
<button popovertarget="p1"
        popovertargetaction="show">
  Open
</button>
<button popovertarget="p1"
        popovertargetaction="hide">
  Close
</button>`}
          </Code>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: blue, marginBottom: "0.4em" }}>
            Imperative (JS)
          </h3>
          <Code language="javascript" trim>
            {`const popover =
  document.getElementById("p1");

popover.showPopover();
popover.hidePopover();
popover.togglePopover();

// React to state changes
popover.addEventListener(
  "toggle",
  (e) => {
    console.log(e.oldState); // "closed"
    console.log(e.newState); // "open"
  }
);`}
          </Code>
        </div>
      </div>
    </Slide>
  );
}
