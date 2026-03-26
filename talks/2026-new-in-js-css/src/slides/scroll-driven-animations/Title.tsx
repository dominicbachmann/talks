import { SectionTitle } from "../../shared/SectionTitle";
import { orange } from "../../shared/colors";

export function Title() {
  return (
    <SectionTitle
      title="Scroll-Driven Animations"
      subtitle="Tie animation progress to scroll position — in pure CSS"
      baseline={<>Chrome 115+ &amp; Safari 26 beta — not yet in Firefox</>}
      baselineColor={orange}
    />
  );
}
