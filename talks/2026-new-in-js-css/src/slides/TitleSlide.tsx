import { Slide } from "@revealjs/react";
import { darkBg, gray, blue } from "../shared/colors";

export function TitleSlide() {
  return (
    <Slide backgroundColor={darkBg}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <img
          src="/javascript_luzern_logo.png"
          alt="JavaScript Luzern"
          style={{ height: "140px", marginBottom: "0.5em" }}
        />
        <h1 style={{ fontSize: "2.2em", marginBottom: "0.1em" }}>
          What's New in JavaScript & CSS
        </h1>
        <p style={{ fontSize: "1.1em", color: gray }}>
          APIs, patterns & features that just landed
        </p>
        <p
          style={{
            fontSize: "0.9em",
            color: blue,
            marginTop: "1em",
          }}
        >
          Dominic Bachmann
        </p>
      </div>
    </Slide>
  );
}
