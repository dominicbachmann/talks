import { Slide, Fragment } from "@revealjs/react";

export function WhatsWrongWithDate() {
  return (
    <Slide>
      <h2>
        What's wrong with <code>Date</code>?
      </h2>
      <div style={{ textAlign: "left", fontSize: "0.85em", marginTop: "1em" }}>
        <Fragment animation="fade-up">
          <p>
            <strong>Mutable</strong> — <code>setMonth()</code> modifies the
            object in place. A function that receives a Date can silently
            corrupt the caller's data.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>No timezone support</strong> — Date stores a UTC timestamp
            but has no concept of "this is a meeting in Tokyo." You fake it
            with <code>Intl.DateTimeFormat</code> hacks.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>No arithmetic</strong> — want to add 7 days? You write{" "}
            <code>d.setDate(d.getDate() + 7)</code>. Durations don't exist.
          </p>
        </Fragment>
        <Fragment animation="fade-up">
          <p style={{ marginTop: "0.6em" }}>
            <strong>Confusing API</strong> — months are 0-indexed,{" "}
            <code>getYear()</code> returns years since 1900,{" "}
            <code>Date.parse()</code> is inconsistent across browsers.
          </p>
        </Fragment>
      </div>
    </Slide>
  );
}
