import { SectionTitle } from "../../shared/SectionTitle";

export function Title() {
  return (
    <SectionTitle
      title="Temporal API"
      subtitle={<>A modern, immutable replacement for <code>Date</code></>}
      baseline="Chrome & Firefox — Safari via polyfill"
    />
  );
}
