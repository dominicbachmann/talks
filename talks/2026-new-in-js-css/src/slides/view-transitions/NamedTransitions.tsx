import { Slide, Code, Fragment } from "@revealjs/react";
import { gray, green, red } from "../../shared/colors";

export function NamedTransitions() {
  return (
    <Slide>
      <h2>Named transitions: element morphing</h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.8em" }}>
        Give elements a <code>view-transition-name</code> so the browser
        knows they're "the same thing" across states
      </p>
      <div style={{ display: "flex", gap: "1.5em" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: red }}>Old state (list view)</h4>
          <Code language="css" trim>
            {`.product-thumbnail {
  view-transition-name: hero-image;
  /* 80x80 thumbnail in a grid */
}`}
          </Code>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: green }}>New state (detail view)</h4>
          <Code language="css" trim>
            {`.product-hero {
  view-transition-name: hero-image;
  /* 600x400 hero on detail page */
}`}
          </Code>
        </div>
      </div>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "0.8em", fontSize: "0.85em" }}>
          Same <code>view-transition-name</code>, two different elements. The
          browser morphs the thumbnail into the hero — animating position, size,
          and aspect ratio automatically.
        </p>
      </Fragment>
    </Slide>
  );
}
