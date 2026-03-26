import { Slide } from "@revealjs/react";
import { green, gray, orange } from "../../shared/colors";
import { TwoColumnComparison } from "../../shared/TwoColumnComparison";

export function DialogVsPopover() {
  return (
    <Slide>
      <h2>Dialog vs Popover — when to use which</h2>
      <TwoColumnComparison
        marginTop="1em"
        fontSize="0.85em"
        headingMarginBottom="0.5em"
        left={{
          title: <code>&lt;dialog&gt;</code>,
          color: green,
          children: (
            <>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li>Confirmation prompts</li>
                <li style={{ marginTop: "0.3em" }}>Login / signup forms</li>
                <li style={{ marginTop: "0.3em" }}>Settings panels</li>
              </ul>
              <p
                style={{
                  color: gray,
                  marginTop: "0.6em",
                  fontSize: "0.9em",
                }}
              >
                Focused interactions that demand a response before continuing.
              </p>
            </>
          ),
        }}
        right={{
          title: <code>popover</code>,
          color: orange,
          children: (
            <>
              <ul style={{ listStyle: "disc", paddingLeft: "1.2em" }}>
                <li>Tooltips</li>
                <li style={{ marginTop: "0.3em" }}>Dropdown menus</li>
                <li style={{ marginTop: "0.3em" }}>Date pickers</li>
                <li style={{ marginTop: "0.3em" }}>Toast notifications</li>
              </ul>
              <p
                style={{
                  color: gray,
                  marginTop: "0.6em",
                  fontSize: "0.9em",
                }}
              >
                Supplementary content that doesn't block the rest of the page.
              </p>
            </>
          ),
        }}
      />
    </Slide>
  );
}
