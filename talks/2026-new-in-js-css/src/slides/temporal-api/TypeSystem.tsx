import { Slide } from "@revealjs/react";
import { gray } from "../../shared/colors";

const tableStyle = {
  fontSize: "0.7em",
  marginTop: "0.8em",
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = { textAlign: "left" as const, padding: "0.4em 0.6em" };
const tdStyle = { padding: "0.4em 0.6em" };
const tdMuted = { padding: "0.4em 0.6em", color: gray };
const rowBorder = { borderBottom: "1px solid #333" };
const headBorder = { borderBottom: "2px solid #444" };

function TypeTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr style={headBorder}>
          <th style={thStyle}>Type</th>
          <th style={thStyle}>Use case</th>
          <th style={thStyle}>Example</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function TypeSystem() {
  return (
    <>
      <Slide>
        <h2>Pick the right type for the job</h2>
        <TypeTable>
          <tr style={rowBorder}>
            <td style={tdStyle}>
              <code>Instant</code>
            </td>
            <td style={tdStyle}>
              Exact moment in time (like a log timestamp)
            </td>
            <td style={tdMuted}>
              <code>Temporal.Now.instant()</code>
            </td>
          </tr>
          <tr style={rowBorder}>
            <td style={tdStyle}>
              <code>ZonedDateTime</code>
            </td>
            <td style={tdStyle}>
              Date + time + timezone (a meeting, a flight)
            </td>
            <td style={tdMuted}>
              <code>Temporal.Now.zonedDateTimeISO('Asia/Tokyo')</code>
            </td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <code>PlainDate</code>
            </td>
            <td style={tdStyle}>
              Just a date, no time or timezone (a birthday)
            </td>
            <td style={tdMuted}>
              <code>Temporal.PlainDate.from('2026-03-23')</code>
            </td>
          </tr>
        </TypeTable>
      </Slide>

      <Slide>
        <h2>Pick the right type for the job</h2>
        <TypeTable>
          <tr style={rowBorder}>
            <td style={tdStyle}>
              <code>PlainTime</code>
            </td>
            <td style={tdStyle}>
              Just a time, no date (an alarm, store hours)
            </td>
            <td style={tdMuted}>
              <code>Temporal.PlainTime.from('09:30')</code>
            </td>
          </tr>
          <tr style={rowBorder}>
            <td style={tdStyle}>
              <code>PlainDateTime</code>
            </td>
            <td style={tdStyle}>
              Date + time, no timezone (a local event)
            </td>
            <td style={tdMuted}>
              <code>Temporal.PlainDateTime.from('2026-03-23T09:30')</code>
            </td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <code>Duration</code>
            </td>
            <td style={tdStyle}>A span of time (1 hour 30 minutes)</td>
            <td style={tdMuted}>
              <code>
                {"Temporal.Duration.from({ hours: 1, minutes: 30 })"}
              </code>
            </td>
          </tr>
        </TypeTable>
      </Slide>
    </>
  );
}
