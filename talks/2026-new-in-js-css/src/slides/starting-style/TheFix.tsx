import { Code, Fragment, Slide } from "@revealjs/react";
import { green } from "../../shared/colors";

export function TheFix() {
  return (
    <Slide>
      <h2>
        The fix: <code style={{ color: green }}>@starting-style</code>
      </h2>
      <Code language="css" lineNumbers="1-7|9-14|16-20" trim>
        {`.box {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease,
              transform 0.5s ease,
              display 0.5s ease allow-discrete;
}

/* The "before" state for entry */
@starting-style {
  .box {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* Exit state — applied when hiding */
.box.hidden {
  display: none;
  opacity: 0;
  transform: translateY(20px);
}`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: green,
            marginTop: "0.6em",
          }}
        >
          Three pieces: <code>@starting-style</code> for entry,{" "}
          <code>.hidden</code> for exit,{" "}
          <code>allow-discrete</code> to transition <code>display</code> itself.
        </p>
      </Fragment>
    </Slide>
  );
}
