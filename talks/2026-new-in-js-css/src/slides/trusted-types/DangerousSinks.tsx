import { Slide, Fragment } from "@revealjs/react";

export function DangerousSinks() {
  return (
    <Slide>
      <h2>The dangerous sinks problem</h2>
      <div style={{ textAlign: "left", fontSize: "0.85em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>DOM XSS happens client-side</strong> — your own JavaScript
            writes untrusted data to a dangerous sink. The server never sees the
            payload.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>The sinks</strong> — <code>innerHTML</code>,{" "}
            <code>outerHTML</code>, <code>document.write()</code>,{" "}
            <code>eval()</code>, <code>script.src</code>, and ~60 more. Any API
            that interprets strings as HTML, JS, or URLs.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>CSP can't help</strong> — when your own JS calls{" "}
            <code>element.innerHTML = userInput</code>, CSP sees it as
            legitimate first-party code. The script is allowed; the data is the
            problem.
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
