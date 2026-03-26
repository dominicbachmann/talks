import { Slide, Fragment } from "@revealjs/react";

export function AdoptionPath() {
  return (
    <Slide>
      <h2>Practical adoption</h2>
      <div style={{ textAlign: "left", fontSize: "0.85em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>1. Report-only</strong> —{" "}
            <code>Content-Security-Policy-Report-Only</code> header. Violations
            are reported, nothing breaks.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>2. Enforce with default policy</strong> — sanitize and log
            every sink usage. App keeps working.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>3. Convert call sites</strong> — route through an explicit
            policy, or switch to <code>textContent</code> where HTML isn't
            needed.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>4. Lock down</strong> — remove the default policy. Restrict{" "}
            <code>trusted-types</code> in CSP to only your named policies.
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
