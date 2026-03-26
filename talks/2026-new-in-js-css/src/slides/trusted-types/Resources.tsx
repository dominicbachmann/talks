import { Fragment } from "@revealjs/react";
import { blue, gray, green } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";

export function Resources() {
  return (
    <StatusSlide title="Status & resources">
      <p>
        <strong style={{ color: green }}>Chrome</strong> — Shipped
      </p>
      <p style={{ marginTop: "0.5em" }}>
        <strong style={{ color: green }}>Edge</strong> — Shipped
      </p>
      <p style={{ marginTop: "0.5em" }}>
        <strong style={{ color: green }}>Firefox</strong> — Shipped
      </p>
      <p style={{ marginTop: "0.5em" }}>
        <strong style={{ color: green }}>Safari</strong> — Shipped
      </p>
      <p style={{ marginTop: "1.2em" }}>
        <strong>Baseline:</strong> February 2026 — all major browsers
      </p>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "1.2em" }}>
          <strong>Deep dive:</strong>{" "}
          <code style={{ color: blue, fontSize: "0.85em" }}>
            medium.com/@dominicbachmann/protecting-against-cross-site-scripting-with-trusted-types
          </code>
        </p>
      </Fragment>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "1.2em", color: gray }}>
          CSP prevents injection of new scripts. Trusted Types prevents your
          own scripts from being weaponized.
        </p>
      </Fragment>
    </StatusSlide>
  );
}
