import { Slide, Fragment } from "@revealjs/react";
import { darkBg, lightGray, blue } from "../shared/colors";

const topics = [
  "Temporal API",
  "Trusted Types",
  "View Transitions",
  "Anchor Positioning",
  "@starting-style",
  "Popover API",
  "Native Dialog",
  "Invoker Commands",
  "Logical Properties",
  "Scroll-Driven Animations",
];

export function TableOfContents() {
  return (
    <Slide backgroundColor={darkBg}>
      <h2 style={{ marginBottom: "0.8em" }}>Agenda</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35em",
          fontSize: "0.85em",
          textAlign: "left",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {topics.map((topic, i) => (
          <Fragment key={topic} animation="fade-up">
            <p style={{ margin: 0, color: lightGray }}>
              <span style={{ color: blue }}>{i + 1}.</span> {topic}
            </p>
          </Fragment>
        ))}
      </div>
    </Slide>
  );
}
