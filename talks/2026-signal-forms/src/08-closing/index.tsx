import { Slide } from "@revealjs/react";

const GRADIENT_IMAGE =
  "linear-gradient(135deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68))";

const GRADIENT_LINEAR =
  "linear-gradient(90deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68))";

const gradientText: React.CSSProperties = {
  backgroundImage: GRADIENT_IMAGE,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const centeredSlide: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  background: "#111",
};

const divider: React.CSSProperties = {
  width: 180,
  height: 3,
  borderRadius: 2,
  marginTop: "1.2em",
  backgroundImage: GRADIENT_LINEAR,
};

const takeaways: { label: string; body: React.ReactNode }[] = [
  {
    label: "Model-first",
    body: "one typed signal tree drives value, validation, and state",
  },
  {
    label: "Validation",
    body: "schema-attached rules: built-ins, custom, async, cross-field",
  },
  {
    label: "Schema logic",
    body: (
      <>
        <code>disabled</code>, <code>hidden</code>, <code>applyWhen</code>, and
        metadata live in the schema
      </>
    ),
  },
  {
    label: "Custom controls",
    body: (
      <>
        plain components implementing <code>FormValueControl</code> /{" "}
        <code>FormCheckboxControl</code>
      </>
    ),
  },
];

export function WrapUpSlide() {
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
          textAlign: "left",
        }}
      >
        <h2
          style={{
            ...gradientText,
            fontSize: "1.6em",
            fontWeight: 700,
            margin: "0 0 0.6em",
          }}
        >
          Wrap Up
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.35em",
          }}
        >
          {takeaways.map((item) => (
            <li
              key={item.label}
              style={{
                fontSize: "0.85em",
                color: "oklch(85% .01 0)",
                lineHeight: 1.45,
              }}
            >
              <span style={{ fontWeight: 700, color: "#fff" }}>
                {item.label}
              </span>
              <span style={{ color: "oklch(65% .01 0)" }}> — </span>
              {item.body}
            </li>
          ))}
        </ul>
        <p
          style={{
            fontSize: "0.7em",
            color: "oklch(60% .01 0)",
            lineHeight: 1.5,
            marginTop: "1em",
            fontStyle: "italic",
          }}
        >
          Experimental in Angular 21
        </p>
      </div>
    </Slide>
  );
}

export function QuestionsSlide() {
  return (
    <Slide>
      <div style={centeredSlide}>
        <h1
          style={{
            ...gradientText,
            fontSize: "4.5em",
            fontWeight: 800,
            lineHeight: 1.15,
            margin: 0,
            textAlign: "center",
          }}
        >
          Questions?
        </h1>
        <div style={divider} />
      </div>
    </Slide>
  );
}

export function ThankYouSlide() {
  return (
    <Slide>
      <div style={centeredSlide}>
        <h1
          style={{
            ...gradientText,
            fontSize: "4.5em",
            fontWeight: 800,
            lineHeight: 1.15,
            margin: 0,
            textAlign: "center",
          }}
        >
          Thank you
        </h1>
        <div style={divider} />
      </div>
    </Slide>
  );
}
