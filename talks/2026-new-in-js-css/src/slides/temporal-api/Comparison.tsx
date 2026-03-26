import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function Comparison() {
  return (
    <Slide>
      <h2>Comparison & sorting</h2>
      <Code language="javascript" lineNumbers trim>
        {`const a = Temporal.PlainDate.from('2026-03-23');
const b = Temporal.PlainDate.from('2026-12-25');

// Equality
a.equals(b);  // false

// Comparison — works directly with Array.sort()
const dates = [b, a];
dates.sort(Temporal.PlainDate.compare);
// [2026-03-23, 2026-12-25]

// Works the same on every Temporal type:
// Temporal.Instant.compare, Temporal.ZonedDateTime.compare, etc.`}
      </Code>
      <p style={{ marginTop: "1em", fontSize: "0.85em", color: gray }}>
        No more <code>dateA.getTime() - dateB.getTime()</code> comparators.
        Every Temporal type ships a static <code>.compare()</code> function
        designed for <code>Array.sort()</code>.
      </p>
    </Slide>
  );
}
