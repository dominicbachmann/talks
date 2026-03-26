import { Slide } from "@revealjs/react";
import { darkBg } from "../shared/colors";

export function ThankYou() {
  return (
    <Slide backgroundColor={darkBg}>
      <h1 style={{ fontSize: "2.5em", marginBottom: "0.5em" }}>Thank You!</h1>
      <img
        src="/javascript_luzern_logo.png"
        alt="JavaScript Luzern"
        style={{ height: "100px", marginTop: "1em" }}
      />
    </Slide>
  );
}
