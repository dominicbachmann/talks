import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function Immutability() {
  return (
    <Slide>
      <h2>Immutable by design</h2>
      <Code language="javascript" lineNumbers trim>
        {`const date = Temporal.PlainDate.from('2026-01-15');

const nextWeek  = date.add({ days: 7 });
const lastMonth = date.subtract({ months: 1 });
const endOfYear = date.with({ month: 12, day: 31 });

// Every operation returns a new object.
// The original is untouched:
date.toString();       // "2026-01-15"
nextWeek.toString();   // "2026-01-22"
lastMonth.toString();  // "2025-12-15"
endOfYear.toString();  // "2026-12-31"`}
      </Code>
      <p style={{ marginTop: "1em", fontSize: "0.85em", color: gray }}>
        <code>.add()</code>, <code>.subtract()</code>, <code>.with()</code>{" "}
        — they all return new instances. Pass Temporal objects to functions
        without worrying about mutation.
      </p>
    </Slide>
  );
}
