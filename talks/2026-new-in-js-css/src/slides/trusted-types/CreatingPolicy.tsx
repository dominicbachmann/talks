import { Slide, Code, Fragment } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function CreatingPolicy() {
  return (
    <Slide>
      <h2>Creating a policy</h2>
      <Code language="javascript" lineNumbers trim>
        {`// Define a policy — the only place raw strings become trusted
const sanitizePolicy = trustedTypes.createPolicy('my-policy', {
  createHTML: (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
      ALLOWED_ATTR: ['href', 'class'],
    });
  },
  createScript: (input) => {
    throw new Error('Script creation is blocked by policy');
  },
  createScriptURL: (input) => {
    const url = new URL(input, document.baseURI);
    if (url.origin === location.origin) return url.toString();
    throw new Error(\`Blocked external script URL: \${input}\`);
  },
});`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ fontSize: "0.85em", color: gray, marginTop: "0.8em" }}>
          A policy is a single gate. All raw-string-to-trusted-type conversions
          go through here. <code>createHTML</code>, <code>createScript</code>, and{" "}
          <code>createScriptURL</code> map to the three trusted types:{" "}
          <code>TrustedHTML</code>, <code>TrustedScript</code>, and{" "}
          <code>TrustedScriptURL</code>.
        </p>
      </Fragment>
    </Slide>
  );
}
