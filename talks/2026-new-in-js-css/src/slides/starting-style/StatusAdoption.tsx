import { green, blue, red } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";
import { StatusSlide } from "../../shared/StatusSlide";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="Baseline 2024">
        — supported in Chrome, Firefox, and Safari. No polyfill needed, safe
        to use in production today.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="The key pattern"
        style={{ marginTop: "0.6em" }}
      >
        — three pieces: <code>@starting-style</code> for entry,{" "}
        matching styles on the closed state for exit, and{" "}
        <code>allow-discrete</code> to transition <code>display</code>.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="Composes with the platform"
        style={{ marginTop: "0.6em" }}
      >
        — works with Popover, Dialog, and any element that toggles{" "}
        <code>display</code>. The same CSS pattern applies everywhere.
      </BulletPoint>
      <BulletPoint
        color={red}
        label="Underused"
        style={{ marginTop: "0.6em" }}
      >
        — despite
        being baseline, many developers still reach for JS animation
        libraries for entry animations. Spread the word.
      </BulletPoint>
    </StatusSlide>
  );
}
