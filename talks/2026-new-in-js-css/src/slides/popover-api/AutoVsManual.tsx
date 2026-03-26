import { Code, Slide } from "@revealjs/react";
import { blue, gray, green, orange } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";
import { TwoColumnComparison } from "../../shared/TwoColumnComparison";

export function AutoVsManual() {
  return (
    <Slide>
      <h2>
        <code>popover="auto"</code> vs <code>popover="manual"</code>
      </h2>
      <TwoColumnComparison
        left={{
          title: <>Auto <span style={{ color: gray, fontSize: "0.7em" }}>(default)</span></>,
          color: green,
          children: (
            <>
              <Code language="html" trim>
                {`<!-- These are equivalent -->
<div popover>...</div>
<div popover="auto">...</div>`}
              </Code>
              <div style={{ fontSize: "0.8em", marginTop: "0.5em" }}>
                <BulletPoint color={blue} label="Light-dismiss">
                  — click outside or press Escape to close
                </BulletPoint>
                <BulletPoint color={blue} label="Auto-closes siblings" style={{ marginTop: "0.4em" }}>
                  — only one open at a time, unless a popover opens another from inside
                </BulletPoint>
              </div>
            </>
          ),
        }}
        right={{
          title: "Manual",
          color: orange,
          children: (
            <>
              <Code language="html" trim>
                {`<div popover="manual">...</div>`}
              </Code>
              <div style={{ fontSize: "0.8em", marginTop: "0.5em" }}>
                <BulletPoint color={blue} label="No light-dismiss">
                  — won't close on click outside or Escape. You must close it
                  explicitly via button or JS.
                </BulletPoint>
                <BulletPoint color={blue} label="Doesn't close others" style={{ marginTop: "0.4em" }}>
                  — multiple manual popovers can be open at the same time.
                  Good for toasts and persistent notifications.
                </BulletPoint>
              </div>
            </>
          ),
        }}
      />
    </Slide>
  );
}
