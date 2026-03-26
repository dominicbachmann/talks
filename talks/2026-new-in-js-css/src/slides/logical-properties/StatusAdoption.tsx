import { blue, green, purple } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";
import { StatusSlide } from "../../shared/StatusSlide";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline since April 2021">
        — supported in Chrome, Firefox, and Safari for five years. There
        is no browser support excuse left. The gap is purely
        awareness and habit.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="Zero cost to adopt"
        style={{ marginTop: "0.6em" }}
      >
        — logical properties behave identically to physical properties in
        LTR. You can migrate incrementally — new code uses logical, old
        code stays until you touch it. No visual change, no risk.
      </BulletPoint>
      <BulletPoint
        color={purple}
        label="Future-proofs your CSS"
        style={{ marginTop: "0.6em" }}
      >
        — even if you don't support RTL today, using logical properties
        means you won't need a rewrite when you do. One stylesheet, every
        direction, automatic.
      </BulletPoint>
    </StatusSlide>
  );
}
