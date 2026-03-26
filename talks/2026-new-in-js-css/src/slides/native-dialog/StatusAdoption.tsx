import { green, blue } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";
import { BulletPoint } from "../../shared/BulletPoint";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline since 2022">
        — supported in Chrome, Firefox, and Safari for over three years.
        If you're still building custom modals, you're doing extra work
        for a worse result.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label={<code>&lt;form method="dialog"&gt;</code>}
        style={{ marginTop: "0.6em" }}
      >
        — the elegant pattern for confirmation flows. No click handlers on
        individual buttons, just read <code>dialog.returnValue</code>{" "}
        after close.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="Composes with the platform"
        style={{ marginTop: "0.6em" }}
      >
        — <code>@starting-style</code> for entry/exit animations,{" "}
        <code>::backdrop</code> for styling, invoker commands (
        <code>command="show-modal"</code>) to open declaratively without
        any JavaScript.
      </BulletPoint>
    </StatusSlide>
  );
}
