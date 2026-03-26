import { Code, Fragment, Slide } from "@revealjs/react";
import { gray, red } from "../../shared/colors";

export function TheProblem() {
  return (
    <Slide>
      <h2>Why doesn't the transition fire?</h2>
      <Code language="css" lineNumbers="1-5|7-9" trim>
        {`.box {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s, transform 0.5s;
}

.box.hidden {
  display: none;  /* ← the problem */
}`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.85em",
            color: gray,
            marginTop: "0.8em",
          }}
        >
          When an element goes from{" "}
          <code style={{ color: red }}>display: none</code> to visible,
          the browser has no "before" state to transition from — it renders
          directly into the final state.
        </p>
      </Fragment>
    </Slide>
  );
}
