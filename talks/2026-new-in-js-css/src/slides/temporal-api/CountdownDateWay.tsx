import { Slide, Code } from "@revealjs/react";
import { red } from "../../shared/colors";

export function CountdownDateWay() {
  return (
    <Slide>
      <h2>How long until the conference?</h2>
      <h3 style={{ color: red, marginBottom: "0.6em" }}>
        The <code>Date</code> way
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`const event = new Date('2026-06-15T09:00:00');
const now = new Date();

const diffMs = event - now;  // raw milliseconds

// Manual decomposition — hope you don't mess up the math
const days    = Math.floor(diffMs / 86_400_000);
const hours   = Math.floor((diffMs % 86_400_000) / 3_600_000);
const minutes = Math.floor((diffMs % 3_600_000) / 60_000);

console.log(\`\${days}d \${hours}h \${minutes}m\`);
// Ignores DST transitions, leap seconds, and timezone edge cases`}
      </Code>
    </Slide>
  );
}
