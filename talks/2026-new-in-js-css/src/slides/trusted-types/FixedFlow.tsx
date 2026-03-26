import { Slide, Code, Fragment } from "@revealjs/react";
import { green } from "../../shared/colors";

export function FixedFlow() {
  return (
    <Slide>
      <h2>The fixed flow</h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        With Trusted Types
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`function renderComment(userInput) {
  const commentEl = document.getElementById('comments');

  // Raw string → policy → TrustedHTML → sink
  const safeHTML = sanitizePolicy.createHTML(
    \`<div class="comment">\${userInput}</div>\`
  );

  // safeHTML is a TrustedHTML object, not a string
  commentEl.innerHTML += safeHTML;  // Allowed!
}

// The attacker's payload is sanitized:
renderComment(
  '<img src=x onerror="steal cookies...">'
);
// Result in DOM: <div class="comment"></div>
// The <img> and its onerror are stripped by DOMPurify.`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ fontSize: "0.85em", color: green, marginTop: "0.8em" }}>
          The dangerous payload is neutralized. The browser accepted the write
          because it received a <code>TrustedHTML</code> object, and the policy
          ensured only safe tags passed through.
        </p>
      </Fragment>
    </Slide>
  );
}
