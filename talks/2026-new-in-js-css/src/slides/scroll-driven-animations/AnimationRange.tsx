import { Slide, Fragment } from "@revealjs/react";
import { lightGray, purple, border, green, gray, blue, orange } from "../../shared/colors";

export function AnimationRange() {
  return (
    <Slide>
      <h2>
        <code>animation-range</code>
      </h2>
      <p style={{ fontSize: "0.9em", color: lightGray, marginTop: "0.3em" }}>
        An element's trip through the scrollport has phases —{" "}
        <code style={{ color: purple }}>animation-range</code> picks which
        phase drives your animation
      </p>
      <div
        style={{
          marginTop: "0.8em",
          padding: "0.6em 1em",
          background: "#161b22",
          borderRadius: "6px",
          border: `1px solid ${border}`,
          fontFamily: "monospace",
          fontSize: "0.8em",
          textAlign: "left",
        }}
      >
        <Fragment animation="fade-up">
          <p>
            <code style={{ color: green }}>
              animation-range: entry 0% entry 100%;
            </code>
            <span style={{ color: gray, fontFamily: "system-ui", marginLeft: "0.8em" }}>
              animate while entering the viewport
            </span>
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.4em" }}>
            <code style={{ color: blue }}>
              animation-range: exit 0% exit 100%;
            </code>
            <span style={{ color: gray, fontFamily: "system-ui", marginLeft: "0.8em" }}>
              animate while leaving the viewport
            </span>
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.4em" }}>
            <code style={{ color: orange }}>
              animation-range: entry 0% exit 100%;
            </code>
            <span style={{ color: gray, fontFamily: "system-ui", marginLeft: "0.8em" }}>
              animate across the entire visible span
            </span>
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
