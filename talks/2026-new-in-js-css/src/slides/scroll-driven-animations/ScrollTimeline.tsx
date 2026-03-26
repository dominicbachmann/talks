import { Slide, Code, Fragment } from "@revealjs/react";
import { green, gray } from "../../shared/colors";

export function ScrollTimeline() {
  return (
    <Slide>
      <h2>
        <code>animation-timeline: scroll()</code>
      </h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        The same progress bar — zero JavaScript
      </h3>
      <Code language="css" lineNumbers="1-5|7-13" trim>
        {`@keyframes fill-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.progress-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: #3fb950;
  transform-origin: left;
  animation: fill-progress linear;
  animation-timeline: scroll();
}`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "0.8em", fontSize: "0.85em", color: gray }}>
          Standard <code>@keyframes</code> — just swap{" "}
          <code>animation-duration</code> for{" "}
          <code>animation-timeline</code>
        </p>
      </Fragment>
    </Slide>
  );
}
