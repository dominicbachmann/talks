import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function CustomAnimations() {
  return (
    <Slide>
      <h2>Custom animations: mobile-style slide</h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.6em" }}>
        Replace the default crossfade with CSS keyframes on the pseudo-elements
      </p>
      <Code language="css" lineNumbers trim>
        {`/* Old page slides out to the left */
::view-transition-old(root) {
  animation: slide-out-left 0.3s ease-in forwards;
}

/* New page slides in from the right */
::view-transition-new(root) {
  animation: slide-in-from-right 0.3s ease-out forwards;
}

@keyframes slide-out-left {
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slide-in-from-right {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}`}
      </Code>
      <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.6em" }}>
        Standard CSS animations — anything you can write in{" "}
        <code>@keyframes</code> works. Flip, zoom, fade, 3D perspective — the
        pseudo-elements are just styled elements in the top layer.
      </p>
    </Slide>
  );
}
