import { Code, Fragment, Slide } from "@revealjs/react";
import { blue, green } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";

export function AllowDiscrete() {
  return (
    <Slide>
      <h2>
        <code>transition-behavior: allow-discrete</code>
      </h2>
      <div style={{ textAlign: "left", fontSize: "0.85em", marginTop: "0.6em" }}>
        <BulletPoint color={blue} label="The problem:">
          <code>display</code> is a discrete property — it can't interpolate
          between <code>none</code> and <code>block</code>. Without{" "}
          <code>allow-discrete</code>, the browser applies{" "}
          <code>display: none</code> immediately, cutting off any exit
          animation.
        </BulletPoint>
        <BulletPoint
          color={blue}
          label="The fix:"
          style={{ marginTop: "0.6em" }}
        >
          <code>allow-discrete</code> tells the browser to keep the element
          visible for the duration of the transition, then switch{" "}
          <code>display</code> at the end.
        </BulletPoint>
        <Fragment animation="fade-up">
          <div style={{ marginTop: "0.8em" }}>
            <Code language="css" trim>
              {`transition: opacity 0.3s ease,
            display 0.3s ease allow-discrete;

/* shorthand — applies to all properties */
transition-behavior: allow-discrete;`}
            </Code>
          </div>
        </Fragment>
        <BulletPoint
          color={green}
          label="Key insight:"
          style={{ marginTop: "0.6em" }}
        >
          <code>@starting-style</code> alone isn't enough for{" "}
          <code>display: none</code> transitions — you need both together.
        </BulletPoint>
      </div>
    </Slide>
  );
}
