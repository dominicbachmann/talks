import { Slide, Code, Fragment } from "@revealjs/react";
import { red } from "../../shared/colors";

export function MpaTransitions() {
  return (
    <Slide>
      <h2>MPA: transitions without JavaScript</h2>
      <Code language="css" lineNumbers trim>
        {`/* That's the entire opt-in. Add this to your stylesheet. */
@view-transition {
  navigation: auto;
}

/* Same customization API works — target the pseudo-elements */
::view-transition-old(root) {
  animation: fade-out 0.25s ease-out;
}
::view-transition-new(root) {
  animation: fade-in 0.25s ease-in;
}

/* Named elements work across pages too */
.article-hero {
  view-transition-name: hero;
}`}
      </Code>
      <Fragment animation="fade-up">
        <div style={{ fontSize: "0.85em", marginTop: "0.8em", textAlign: "left" }}>
          <p>
            The browser intercepts same-origin navigations, snapshots the old
            page, loads the new page, then runs the transition. Server-rendered
            apps get app-like transitions with <strong>zero JavaScript</strong>.
          </p>
          <p style={{ marginTop: "0.4em", color: red }}>
            Caveat: MPA view transitions don't work in Firefox yet. Chrome and
            Safari only.
          </p>
        </div>
      </Fragment>
    </Slide>
  );
}
