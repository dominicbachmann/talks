import { blue, green, purple } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";
import { StatusSlide } from "../../shared/StatusSlide";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline December 2025">
        — supported in Chrome, Firefox, and Safari. The{" "}
        <code>commandfor</code> / <code>command</code> attributes are
        production-ready today.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="One pattern, many targets"
        style={{ marginTop: "0.6em" }}
      >
        — the same <code>commandfor</code> attribute works for dialogs,
        popovers, and custom behaviors. No more remembering{" "}
        <code>popovertarget</code> vs <code>aria-controls</code> vs custom
        wiring.
      </BulletPoint>
      <BulletPoint
        color={purple}
        label="Custom commands"
        style={{ marginTop: "0.6em" }}
      >
        — the{" "}
        <code>--</code> prefix convention makes this extensible beyond
        built-in element types.
      </BulletPoint>
    </StatusSlide>
  );
}
