import { green, red } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";
import { BulletPoint } from "../../shared/BulletPoint";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={green} label="SPA (Baseline Oct 2025)">
        — <code>document.startViewTransition()</code> works in Chrome,
        Firefox, and Safari. Production-ready.
      </BulletPoint>
      <BulletPoint color={red} label="MPA (no Firefox)" style={{ marginTop: "0.6em" }}>
        — <code>@view-transition {"{"} navigation: auto {"}"}</code> works
        in Chrome and Safari. No Firefox yet.
      </BulletPoint>
    </StatusSlide>
  );
}
