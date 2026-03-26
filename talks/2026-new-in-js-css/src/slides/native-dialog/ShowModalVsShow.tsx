import { Code, Slide } from "@revealjs/react";
import { green, blue, orange } from "../../shared/colors";
import { TwoColumnComparison } from "../../shared/TwoColumnComparison";
import { BulletPoint } from "../../shared/BulletPoint";

export function ShowModalVsShow() {
  return (
    <Slide>
      <h2>
        <code>showModal()</code> vs <code>show()</code>
      </h2>
      <TwoColumnComparison
        left={{
          title: "showModal()",
          color: green,
          children: (
            <>
              <Code language="javascript" trim>
                {`dialog.showModal();`}
              </Code>
              <div style={{ fontSize: "0.8em", marginTop: "0.5em" }}>
                <BulletPoint color={blue} label="Top layer">
                  —
                  renders above everything, escapes all stacking contexts
                </BulletPoint>
                <BulletPoint
                  color={blue}
                  label="Backdrop"
                  style={{ marginTop: "0.4em" }}
                >
                  —
                  styleable via <code>::backdrop</code>
                </BulletPoint>
                <BulletPoint
                  color={blue}
                  label="Focus trap"
                  style={{ marginTop: "0.4em" }}
                >
                  — Tab
                  cycles within the dialog, background becomes{" "}
                  <code>inert</code>
                </BulletPoint>
              </div>
            </>
          ),
        }}
        right={{
          title: "show()",
          color: orange,
          children: (
            <>
              <Code language="javascript" trim>
                {`dialog.show();`}
              </Code>
              <div style={{ fontSize: "0.8em", marginTop: "0.5em" }}>
                <BulletPoint color={blue} label="Normal flow">
                  —
                  renders in the DOM where it lives, subject to stacking
                  contexts
                </BulletPoint>
                <BulletPoint
                  color={blue}
                  label="No backdrop"
                  style={{ marginTop: "0.4em" }}
                >
                  —
                  the rest of the page remains interactive
                </BulletPoint>
                <BulletPoint
                  color={blue}
                  label="No focus trap"
                  style={{ marginTop: "0.4em" }}
                >
                  —
                  user can Tab out of the dialog into the page
                </BulletPoint>
              </div>
            </>
          ),
        }}
      />
    </Slide>
  );
}
