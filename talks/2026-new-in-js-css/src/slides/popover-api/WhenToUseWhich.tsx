import { Slide } from "@revealjs/react";
import { gray, green, orange } from "../../shared/colors";
import { TwoColumnComparison } from "../../shared/TwoColumnComparison";

export function WhenToUseWhich() {
  return (
    <Slide>
      <h2>When to use which</h2>
      <TwoColumnComparison
        marginTop="1em"
        fontSize="0.85em"
        headingMarginBottom="0.5em"
        left={{
          title: <code>auto</code>,
          color: green,
          children: (
            <>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li>Tooltips</li>
                <li style={{ marginTop: "0.3em" }}>Menus &amp; dropdowns</li>
                <li style={{ marginTop: "0.3em" }}>Date pickers</li>
                <li style={{ marginTop: "0.3em" }}>Action sheets</li>
              </ul>
              <p style={{ color: gray, marginTop: "0.6em", fontSize: "0.9em" }}>
                Anything that should dismiss when the user clicks away.
              </p>
            </>
          ),
        }}
        right={{
          title: <code>manual</code>,
          color: orange,
          children: (
            <>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li>Toast notifications</li>
                <li style={{ marginTop: "0.3em" }}>Teaching / onboarding UI</li>
                <li style={{ marginTop: "0.3em" }}>Persistent toolbars</li>
                <li style={{ marginTop: "0.3em" }}>Custom dismiss logic</li>
              </ul>
              <p style={{ color: gray, marginTop: "0.6em", fontSize: "0.9em" }}>
                When you need full control over the lifecycle.
              </p>
            </>
          ),
        }}
      />
    </Slide>
  );
}
