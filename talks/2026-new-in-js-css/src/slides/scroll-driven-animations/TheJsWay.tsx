import { Slide, Fragment } from "@revealjs/react";

export function TheJsWay() {
  return (
    <Slide>
      <h2>How we've been doing scroll effects</h2>
      <div style={{ textAlign: "left", fontSize: "0.95em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>Scroll event listeners</strong> — reading{" "}
            <code>scrollTop</code> every frame, computing percentages, setting
            inline styles — all on the main thread
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>IntersectionObserver for reveal-on-scroll</strong> —
            watch elements enter the viewport, toggle CSS classes, manage
            thresholds and root margins
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>Performance pitfalls</strong> — layout thrashing, jank from
            expensive scroll handlers, throttling and{" "}
            <code>requestAnimationFrame</code> workarounds
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
