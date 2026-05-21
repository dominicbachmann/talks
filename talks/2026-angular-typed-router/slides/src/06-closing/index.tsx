import { Slide } from "@revealjs/react";
import { ContentSlide } from "../shared/ContentSlide";
import {
  GRADIENT_IMAGE,
  GRADIENT_LINEAR,
  MUTED,
  BODY,
  SECTION_COLORS,
} from "../shared/theme";

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

const recap: { color: string; title: string; punchline: React.ReactNode }[] = [
  {
    color: SECTION_COLORS.stringlyTyped,
    title: "Stringly Typed",
    punchline: "Every workaround was a second source of truth.",
  },
  {
    color: SECTION_COLORS.theInsight,
    title: "The Insight",
    punchline: (
      <>
        <code>as const satisfies Routes</code> — preserve every literal, then
        let TypeScript walk the tree.
      </>
    ),
  },
  {
    color: SECTION_COLORS.theResult,
    title: "The Result",
    punchline:
      "Autocomplete, typo catching, rename safety, typed params — for free.",
  },
  {
    color: SECTION_COLORS.setup,
    title: "How to Set It Up",
    punchline: (
      <>
        <code>ng add</code>, one <code>.d.ts</code> file, two import swaps.
      </>
    ),
  },
  {
    color: SECTION_COLORS.underTheHood,
    title: "Under the Hood",
    punchline:
      "Declaration merging + recursive template literal types. Two thin wrappers at runtime.",
  },
];

export function TakeawaysSlide() {
  return (
    <ContentSlide
      title="The Takeaways"
      subhead="The journey, at a glance"
      color="#fff"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "1.2em",
          rowGap: "0.5em",
          width: "100%",
        }}
      >
        {recap.map((item) => (
          <div
            key={item.title}
            style={{
              paddingLeft: "0.7em",
              borderLeft: `3px solid ${item.color}`,
              lineHeight: 1.25,
            }}
          >
            <div
              style={{
                fontSize: "0.72em",
                fontWeight: 700,
                color: item.color,
                marginBottom: "0.1em",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "0.62em",
                color: BODY,
                lineHeight: 1.4,
              }}
            >
              {item.punchline}
            </div>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

export function DesignPrinciplesSlide() {
  const principles: { title: string; body: React.ReactNode }[] = [
    {
      title: "Zero runtime cost",
      body: "All inference. Two extends-Router classes is the whole shipped code.",
    },
    {
      title: "No codegen",
      body: "No build plugin, no watcher, no generated file to commit.",
    },
    {
      title: "Drop-in replacement",
      body: <>Same API as <code>Router</code> / <code>RouterLink</code>. Swap the imports — done.</>,
    },
    {
      title: "Great DX",
      body: "Autocomplete, rename safety, and inline errors out of the box.",
    },
  ];
  return (
    <ContentSlide
      title="Design Principles"
      subhead="The decisions behind the API."
      color="#fff"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.8em",
          width: "100%",
        }}
      >
        {principles.map((p) => (
          <div
            key={p.title}
            style={{
              paddingLeft: "0.7em",
              borderLeft: `3px solid ${SECTION_COLORS.theResult}`,
            }}
          >
            <div
              style={{
                fontSize: "0.95em",
                fontWeight: 700,
                color: BODY,
                marginBottom: "0.2em",
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: "0.78em",
                color: MUTED,
                lineHeight: 1.45,
              }}
            >
              {p.body}
            </div>
          </div>
        ))}
      </div>
    </ContentSlide>
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

const links: { label: string; url: string }[] = [
  { label: "Package", url: "ng add angular-typed-router" },
  { label: "Repo", url: "github.com/dominicbachmann/angular-typed-router" },
  { label: "Slides", url: "github.com/dominicbachmann/talks" },
];

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
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "2em 0 0",
            display: "flex",
            flexDirection: "column",
            gap: "0.4em",
            alignItems: "start",
          }}
        >
          {links.map((link) => (
            <li
              key={link.label}
              style={{
                fontSize: "0.85em",
                color: BODY,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: MUTED, fontWeight: 600 }}>
                {link.label}
              </span>
              <span style={{ color: MUTED }}> — </span>
              <code
                style={{
                  fontSize: "0.9em",
                  background: "transparent",
                  color: BODY,
                }}
              >
                {link.url}
              </code>
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
