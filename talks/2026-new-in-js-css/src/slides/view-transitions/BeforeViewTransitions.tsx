import { Slide, Fragment } from "@revealjs/react";

export function BeforeViewTransitions() {
  return (
    <Slide>
      <h2>How we've been doing page transitions</h2>
      <div style={{ textAlign: "left", fontSize: "0.95em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>FLIP animations</strong> — manual getBoundingClientRect +
            transforms
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>Libraries</strong> — Framer Motion, GSAP Flip, Barba.js,
            Swup
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>MPA?</strong> — hard page loads, white flash, no options
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
