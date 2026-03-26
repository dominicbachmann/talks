import { blue, green } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";
import { StatusSlide } from "../../shared/StatusSlide";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline January 2025">
        — supported in Chrome, Firefox, and Safari. Safe to use in
        production today with no polyfill.
      </BulletPoint>
      <BulletPoint color={blue} label="Composes with everything" style={{ marginTop: "0.6em" }}>
        — anchor positioning for placement, <code>@starting-style</code>{" "}
        for entry/exit animations, invoker commands for declarative wiring.
        The platform APIs are designed to work together.
      </BulletPoint>
    </StatusSlide>
  );
}
