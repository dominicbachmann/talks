import { DemoSlide } from "../../shared/DemoSlide";
import { red } from "../../shared/colors";

export function XssDemoLive() {
  return (
    <DemoSlide
      title="Live: no protection"
      src="/demos/xss-vulnerable.html"
      color={red}
    />
  );
}
