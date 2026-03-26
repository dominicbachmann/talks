import { Slide, Code, Fragment } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function DefaultPolicy() {
  return (
    <Slide>
      <h2>The default policy</h2>
      <ul style={{ fontSize: "0.85em", textAlign: "left", marginBottom: "0.6em" }}>
        <li>
          A policy named <code>"default"</code> is special — when CSP enforces
          trusted types, any string passed to a sink is automatically routed
          through it
        </li>
        <li style={{ marginTop: "0.4em" }}>
          No code changes at call sites — existing <code>innerHTML</code>{" "}
          assignments keep working
        </li>
        <li style={{ marginTop: "0.4em" }}>
          Use it to log every violation, then migrate call sites one by one
        </li>
      </ul>
      <Code language="javascript" lineNumbers trim>
        {`trustedTypes.createPolicy('default', {
  createHTML: (input, sink) => {
    console.warn(\`Untrusted HTML passed to: \${sink}\`);
    reportToMonitoring({ sink, snippet: input.slice(0, 200) });
    return DOMPurify.sanitize(input);
  },
});

// Existing code keeps working — the string is automatically
// passed through the default policy before reaching the sink
element.innerHTML = '<b>Hello</b>';`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ fontSize: "0.85em", color: gray, marginTop: "0.8em" }}>
          Once all call sites use an explicit policy, remove the default and
          tighten your CSP.
        </p>
      </Fragment>
    </Slide>
  );
}
