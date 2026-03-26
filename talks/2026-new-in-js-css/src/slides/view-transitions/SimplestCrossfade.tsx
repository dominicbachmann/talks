import { Slide, Code, Fragment } from "@revealjs/react";
import { gray, green } from "../../shared/colors";

export function SimplestCrossfade() {
  return (
    <Slide>
      <h2>The simplest case: default crossfade</h2>
      <Code language="javascript" lineNumbers trim>
        {`// Wrap any DOM update in startViewTransition()
document.startViewTransition(() => {
  // This callback does the actual DOM change.
  // The browser snapshots BEFORE, runs this, snapshots AFTER,
  // then crossfades between the two snapshots.
  updateTheDom();
});`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "1em", fontSize: "0.85em", color: gray }}>
          That's it. The entire page crossfades between old and new state. No
          keyframes, no libraries, no measuring.
        </p>
      </Fragment>
      <Fragment animation="fade-up">
        <p style={{ fontSize: "0.8em", color: green, marginTop: "0.5em" }}>
          Guard with <code>if (document.startViewTransition)</code> — older
          browsers just call your update function directly, no animation.
        </p>
      </Fragment>
    </Slide>
  );
}
