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

const takeaways: {
  color: string;
  title: string;
  punchline: React.ReactNode;
}[] = [
  {
    color: SECTION_COLORS.systemInstructions,
    title: "System Instructions",
    punchline: "Role, rules, examples — structure beats vibes.",
  },
  {
    color: SECTION_COLORS.aiBasics,
    title: "Messages & Turns",
    punchline: (
      <>
        <code>user</code> / <code>assistant</code> / <code>error</code> — a turn
        ends when content ships without tool calls.
      </>
    ),
  },
  {
    color: SECTION_COLORS.resources,
    title: "Resources",
    punchline: "Reactive signals for every shape: chat, completion, structured, UI.",
  },
  {
    color: SECTION_COLORS.skillet,
    title: "Skillet",
    punchline: "Typed, streaming-friendly schemas — primitives, compounds, anyOf, enums.",
  },
  {
    color: SECTION_COLORS.streaming,
    title: "Streaming",
    punchline: "Progressive results the moment tokens arrive.",
  },
  {
    color: SECTION_COLORS.toolCalling,
    title: "Tool Calling",
    punchline: "Typed functions the model can invoke.",
  },
  {
    color: SECTION_COLORS.generativeUi,
    title: "Generative UI",
    punchline: "The model renders your real components, not markdown.",
  },
  {
    color: SECTION_COLORS.jsRuntime,
    title: "JS Runtime",
    punchline: "Safe, sandboxed JS execution in the browser for complex logic.",
  },
];

export function TakeawaysSlide() {
  return (
    <ContentSlide
      title="The Takeaways"
      subhead="Everything we covered"
      color="#fff"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "1.2em",
          rowGap: "0.35em",
          width: "100%",
        }}
      >
        {takeaways.map((item) => (
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
                fontSize: "0.68em",
                fontWeight: 700,
                color: item.color,
                marginBottom: "0.1em",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                fontSize: "0.58em",
                color: BODY,
                lineHeight: 1.35,
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
  { label: "Docs", url: "hashbrown.dev" },
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
