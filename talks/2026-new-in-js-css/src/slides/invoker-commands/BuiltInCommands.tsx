import { Fragment, Slide } from "@revealjs/react";
import { blue, green, lightGray, orange, purple } from "../../shared/colors";

export function BuiltInCommands() {
  return (
    <Slide>
      <h2>Built-in commands</h2>
      <div
        style={{ textAlign: "left", fontSize: "0.85em", marginTop: "1em" }}
      >
        <Fragment animation="fade-up">
          <p>
            <strong style={{ color: green }}>Dialog</strong>
          </p>
          <p style={{ paddingLeft: "1em", color: lightGray }}>
            <code>show-modal</code> — open as modal (backdrop, focus trap,
            Escape){" "}
          </p>
          <p style={{ paddingLeft: "1em", color: lightGray }}>
            <code>close</code> — close the dialog, optionally with a return
            value
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.8em" }}>
            <strong style={{ color: orange }}>Popover</strong>
          </p>
          <p style={{ paddingLeft: "1em", color: lightGray }}>
            <code>toggle-popover</code> /{" "}
            <code>show-popover</code> /{" "}
            <code>hide-popover</code>
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.8em" }}>
            <strong style={{ color: purple }}>Custom</strong>
          </p>
          <p style={{ paddingLeft: "1em", color: lightGray }}>
            Any value starting with <code>--</code> (e.g.,{" "}
            <code>command="--delete"</code>) — fires a{" "}
            <code style={{ color: blue }}>command</code> event on the
            target
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
