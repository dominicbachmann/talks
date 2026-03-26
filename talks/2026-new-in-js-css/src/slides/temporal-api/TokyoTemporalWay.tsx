import { Slide, Fragment, Code } from "@revealjs/react";
import { green, gray } from "../../shared/colors";

export function TokyoTemporalWay() {
  return (
    <Slide>
      <h2>What time is it in Tokyo?</h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        The Temporal way
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`const tokyo = Temporal.Now.zonedDateTimeISO('Asia/Tokyo');

tokyo.toString();
// "2026-03-24T14:30:45.123456789+09:00[Asia/Tokyo]"

tokyo.hour;        // 14
tokyo.minute;      // 30
tokyo.dayOfWeek;   // 2 (Tuesday)
tokyo.timeZoneId;  // "Asia/Tokyo"`}
      </Code>
      <Fragment animation="fade-up">
        <p style={{ marginTop: "1em", fontSize: "0.85em", color: gray }}>
          One line. The timezone is a first-class part of the type — not
          bolted on through a formatter.
        </p>
      </Fragment>
    </Slide>
  );
}
