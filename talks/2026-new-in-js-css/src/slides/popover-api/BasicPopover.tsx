import { Code, Fragment, Slide } from "@revealjs/react";
import { blue, green } from "../../shared/colors";

export function BasicPopover() {
  return (
    <Slide>
      <h2>
        The simplest popover:{" "}
        <span style={{ color: green }}>just HTML</span>
      </h2>
      <Code language="html" lineNumbers="1-2|4-7" trim>
        {`<!-- The trigger — no addEventListener needed -->
<button popovertarget="my-popover">Show info</button>

<!-- The popover — hidden by default -->
<div id="my-popover" popover>
  <p>This is a native popover. Click outside or press Escape.</p>
</div>`}
      </Code>
      <Fragment animation="fade-up">
        <div
          style={{
            display: "flex",
            gap: "1.5em",
            marginTop: "0.8em",
            fontSize: "0.8em",
            textAlign: "left",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>
              <strong style={{ color: blue }}>
                <code>popovertarget</code>
              </strong>{" "}
              — points a button at a popover by ID. Clicking toggles it.
              No <code>querySelector</code>, no <code>addEventListener</code>.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p>
              <strong style={{ color: blue }}>
                <code>popover</code>
              </strong>{" "}
              — makes the element a popover. It starts hidden, renders in the{" "}
              <strong>top layer</strong> when shown, and gets light-dismiss
              (click outside + Escape) for free.
            </p>
          </div>
        </div>
      </Fragment>
    </Slide>
  );
}
