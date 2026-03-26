import { Slide, Fragment } from "@revealjs/react";

export function TheJsWay() {
  return (
    <Slide>
      <h2>How we've been positioning tooltips</h2>
      <div style={{ textAlign: "left", fontSize: "0.95em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>Manual measurement</strong> —{" "}
            <code>getBoundingClientRect()</code>, flip on overflow, recalculate
            on scroll/resize
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>Libraries for a basic task</strong> — Floating UI, Popper.js,
            Tippy.js
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
