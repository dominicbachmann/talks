import { Fragment } from "@revealjs/react";
import { green, gray } from "../../shared/colors";
import { StatusSlide } from "../../shared/StatusSlide";

export function StatusAdoption() {
  return (
    <StatusSlide title="Status & adoption">
      <p>
        <strong style={{ color: green }}>Chrome</strong> — Shipped
      </p>
      <p style={{ marginTop: "0.5em" }}>
        <strong style={{ color: green }}>Firefox</strong> — Shipped
      </p>
      <p style={{ marginTop: "0.5em" }}>
        <strong style={{ color: "#d29922" }}>Safari</strong> — Not yet, but
        in progress
      </p>
      <p style={{ marginTop: "1.2em" }}>
        <strong>Polyfill:</strong>{" "}
        <code>temporal-polyfill</code> — production-ready
      </p>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "1.2em", color: gray }}>
          The proposal has been in development since{" "}
          <strong>2017</strong> — one of the longest-running TC39 proposals.
          It's the biggest addition to JavaScript since ES2015.
        </p>
      </Fragment>
    </StatusSlide>
  );
}
