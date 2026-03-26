import { blue, gray, green } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";
import { BulletPoint } from "../../shared/BulletPoint";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline January 2026">
        — supported in Chrome, Firefox, and Safari. Production-ready.
      </BulletPoint>
      <BulletPoint color={blue} label="Replaces Floating UI / Popper.js" style={{ marginTop: "0.6em" }}>
        — for tooltips, popovers, and dropdowns, you no longer need a
        library to position them. The browser does the measurement,
        overflow detection, and repositioning natively.
      </BulletPoint>
      <BulletPoint color={blue} label={<><code>position-try-fallbacks</code> is the killer feature</>} style={{ marginTop: "0.6em" }}>
        — automatic overflow-aware repositioning was the main reason
        people reached for JS solutions. Now it's one CSS property.
      </BulletPoint>
      <BulletPoint color={gray} label="Pairs with Popover API" style={{ marginTop: "0.6em" }}>
        — Popover gives you the top-layer rendering and light-dismiss;
        Anchor Positioning handles where it appears. Together they
        replace the entire tooltip library stack.
      </BulletPoint>
    </StatusSlide>
  );
}
