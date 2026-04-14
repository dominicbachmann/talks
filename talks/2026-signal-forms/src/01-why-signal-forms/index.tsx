import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";

const COLOR = "oklch(51.01% .274 263.83)";

export function WhySectionOpener() {
  return <SectionOpener number="01" title="Why Signal Forms" color={COLOR} />;
}

const benefits = [
  "Auto Sync",
  "Performance",
  "Simplicity",
  "Schema Validation",
];

export function BenefitsSlide() {
  return (
    <Slide>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          background: "#111",
          padding: "0 10%",
        }}
      >
        <h2
          style={{
            fontSize: "1.8em",
            fontWeight: 700,
            color: COLOR,
            margin: "0 0 0.6em",
          }}
        >
          What Signal Forms Bring
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {benefits.map((b, i) => (
            <li
              key={i}
              className="fragment"
              data-fragment-index={i}
              style={{
                fontSize: "1.3em",
                fontWeight: 600,
                color: "oklch(80% .01 0)",
                padding: "0.3em 0",
                paddingLeft: "1em",
                borderLeft: `3px solid ${COLOR}`,
                marginBottom: "0.3em",
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
