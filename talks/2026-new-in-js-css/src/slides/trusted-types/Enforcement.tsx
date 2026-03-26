import { Slide, Code } from "@revealjs/react";
import { blue, gray, red } from "../../shared/colors";
import { CodeColumns, CodeColumn } from "../../shared/CodeColumns";

export function Enforcement() {
  return (
    <Slide>
      <h2>Flip the switch: enforcement</h2>
      <CodeColumns gap="1.5em" marginTop="0.8em">
        <CodeColumn title="CSP header" color={blue} marginBottom="0">
          <Code language="text" trim>
            {`Content-Security-Policy:
  require-trusted-types-for 'script';
  trusted-types my-policy;`}
          </Code>
          <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.6em" }}>
            <code>require-trusted-types-for 'script'</code> activates
            enforcement. <code>trusted-types</code> lists which policy names are
            allowed — anything else is blocked.
          </p>
        </CodeColumn>
        <CodeColumn title="Same code, new result" color={red} marginBottom="0">
          <Code language="javascript" trim>
            {`commentEl.innerHTML += userInput;

// TypeError: Failed to set the
// 'innerHTML' property on 'Element':
// This document requires
// 'TrustedHTML' assignment.`}
          </Code>
          <p style={{ fontSize: "0.8em", color: red, marginTop: "0.6em" }}>
            Every raw string assignment to a dangerous sink now throws.
          </p>
        </CodeColumn>
      </CodeColumns>
    </Slide>
  );
}
