import { Slide, Code } from "@revealjs/react";
import { red } from "../../shared/colors";

export function TokyoDateWay() {
  return (
    <Slide>
      <h2>What time is it in Tokyo?</h2>
      <h3 style={{ color: red, marginBottom: "0.6em" }}>
        The <code>Date</code> way
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`// There's no way to ask Date "what time is it in Tokyo?"
// You have to format a string and parse it back
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false,
});

const tokyoString = formatter.format(new Date());
// "03/24/2026, 14:30:45"
// ...now parse that string back if you need a Date object`}
      </Code>
    </Slide>
  );
}
