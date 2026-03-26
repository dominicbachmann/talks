import { DemoSlide } from "../../shared/DemoSlide";
import { blue } from "../../shared/colors";

export function EnforcementLive() {
  return (
    <DemoSlide
      title="Live: enforcement enabled"
      src="/demos/xss-enforced.html"
      color={blue}
    />
  );
}
