import { Slide, Code, Fragment } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function PseudoElements() {
  return (
    <Slide>
      <h2>The pseudo-element tree</h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.6em" }}>
        During a transition, the browser creates a tree of pseudo-elements
        you can style with CSS
      </p>
      <Code language="text" trim>
        {`::view-transition
├── ::view-transition-group(root)
│   └── ::view-transition-image-pair(root)
│       ├── ::view-transition-old(root)      ← screenshot of old state
│       └── ::view-transition-new(root)      ← screenshot of new state
└── ::view-transition-group(hero-image)
    └── ::view-transition-image-pair(hero-image)
        ├── ::view-transition-old(hero-image)
        └── ::view-transition-new(hero-image)`}
      </Code>
      <Fragment animation="fade-up">
        <div style={{ fontSize: "0.8em", marginTop: "0.8em", textAlign: "left" }}>
          <p>
            <code>::view-transition-group</code> — animates size and position
            between old and new. One per named element, plus <code>root</code>{" "}
            for everything else.
          </p>
          <p style={{ marginTop: "0.3em" }}>
            <code>::view-transition-old / new</code> — the actual screenshots.
            Default animation is crossfade. Override with your own keyframes.
          </p>
        </div>
      </Fragment>
    </Slide>
  );
}
