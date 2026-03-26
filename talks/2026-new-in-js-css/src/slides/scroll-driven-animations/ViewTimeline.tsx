import { Slide, Code, Fragment } from "@revealjs/react";
import { green, gray } from "../../shared/colors";

export function ViewTimeline() {
  return (
    <Slide>
      <h2>
        <code>animation-timeline: view()</code>
      </h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        IntersectionObserver — in CSS
      </h3>
      <Code language="css" lineNumbers="1-5|7-13" trim>
        {`@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal-on-scroll {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "0.8em", fontSize: "0.85em", color: gray }}>
          <code>view()</code> tracks an element's visibility in the scrollport
          — animation progresses as the element enters and exits
        </p>
      </Fragment>
    </Slide>
  );
}
