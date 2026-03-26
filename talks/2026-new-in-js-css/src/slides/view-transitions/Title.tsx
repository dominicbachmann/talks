import { SectionTitle } from "../../shared/SectionTitle";

export function Title() {
  return (
    <SectionTitle
      title="View Transitions"
      subtitle="Native page transitions — no libraries, no FLIP, no framework magic"
      baseline={<>SPA: Baseline October 2025 &nbsp;·&nbsp; MPA: No Firefox support</>}
    />
  );
}
