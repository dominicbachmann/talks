import { Slide, Code } from "@revealjs/react";
import { red, green } from "../../shared/colors";

export function Postponed() {
  return (
    <Slide>
      <h2>The event got postponed by 2 weeks</h2>
      <div style={{ display: "flex", gap: "1.5em", marginTop: "0.8em" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: red }}>Date</h4>
          <Code language="javascript" trim>
            {`const event = new Date(
  '2026-06-15T09:00:00'
);

// Mutates the original!
event.setDate(
  event.getDate() + 14
);

// What was the original date?
// Gone.`}
          </Code>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: green }}>Temporal</h4>
          <Code language="javascript" trim>
            {`const event = Temporal.PlainDate.from(
  '2026-06-15'
);

// Returns a new object
const postponed = event.add(
  { weeks: 2 }
);

// event is still June 15
// postponed is June 29`}
          </Code>
        </div>
      </div>
    </Slide>
  );
}
