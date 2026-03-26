import { Fragment, Slide } from "@revealjs/react";
import { red } from "../../shared/colors";

export function TheOldWay() {
  return (
    <Slide>
      <h2>What it takes to build a popover from scratch</h2>
      <ul
        style={{
          textAlign: "left",
          fontSize: "0.85em",
          marginTop: "0.8em",
          listStyle: "disc",
          paddingLeft: "1.2em",
        }}
      >
        <Fragment as="li" animation="fade-up">
          <strong style={{ color: red }}>Z-index &amp; stacking contexts</strong>{" "}
          — <code>z-index: 9999</code> and it still breaks
        </Fragment>
        <Fragment as="li" animation="fade-up">
          <span style={{ marginTop: "0.4em", display: "inline-block" }}>
            <strong style={{ color: red }}>Click-outside detection</strong>{" "}
            — document listener, target checks, cleanup
          </span>
        </Fragment>
        <Fragment as="li" animation="fade-up">
          <span style={{ marginTop: "0.4em", display: "inline-block" }}>
            <strong style={{ color: red }}>Escape key handling</strong>{" "}
            — which popover closes if multiple are open?
          </span>
        </Fragment>
        <Fragment as="li" animation="fade-up">
          <span style={{ marginTop: "0.4em", display: "inline-block" }}>
            <strong style={{ color: red }}>Focus &amp; accessibility</strong>{" "}
            — trapping, <code>aria-expanded</code>, <code>aria-haspopup</code>, roles
          </span>
        </Fragment>
      </ul>
    </Slide>
  );
}
