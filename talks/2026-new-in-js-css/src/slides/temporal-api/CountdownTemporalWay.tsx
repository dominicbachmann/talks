import { Slide, Code } from "@revealjs/react";
import { green } from "../../shared/colors";

export function CountdownTemporalWay() {
  return (
    <Slide>
      <h2>How long until the conference?</h2>
      <h3 style={{ color: green, marginBottom: "0.6em" }}>
        The Temporal way
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`const event = Temporal.ZonedDateTime.from({
  timeZone: 'America/New_York',
  year: 2026, month: 6, day: 15, hour: 9,
});

const now = Temporal.Now.zonedDateTimeISO('America/New_York');

const until = now.until(event, {
  largestUnit: 'day',
});

until.toString();
// "P82DT17H30M" — 82 days, 17 hours, 30 minutes

until.days;     // 82
until.hours;    // 17
until.minutes;  // 30`}
      </Code>
    </Slide>
  );
}
