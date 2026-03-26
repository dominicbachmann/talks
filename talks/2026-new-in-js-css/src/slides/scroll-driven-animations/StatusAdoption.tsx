import { orange, blue } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";
import { BulletPoint } from "../../shared/BulletPoint";

export function StatusAdoption() {
  return (
    <StatusSlide>
      <BulletPoint color={orange} label="Chrome & Safari only">
        — not yet in Firefox.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label="Compositor-thread performance"
        style={{ marginTop: "0.6em" }}
      >
        — scroll-driven animations run off the main thread. JavaScript
        scroll listeners can never match this — they compete for CPU time
        with your app's other logic.
      </BulletPoint>
      <BulletPoint
        color={blue}
        label={
          <>
            <code>view()</code> replaces IntersectionObserver
          </>
        }
        style={{ marginTop: "0.6em" }}
      >
        — for reveal-on-scroll effects, you can delete the JavaScript
        entirely. And it's continuous, not binary — you get smooth
        progress, not a class toggle at a threshold.
      </BulletPoint>
    </StatusSlide>
  );
}
