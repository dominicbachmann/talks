import { Slide, Code } from "@revealjs/react";
import { red } from "../../shared/colors";

export function TheJsWayCode() {
  return (
    <Slide>
      <h2>The JS positioning boilerplate</h2>
      <h3 style={{ color: red, marginBottom: "0.6em" }}>
        Every tooltip library does some version of this
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`function positionTooltip(trigger, tooltip) {
  const rect = trigger.getBoundingClientRect();

  // Position below the trigger, centered horizontally
  let top = rect.bottom + 8;
  let left = rect.left + rect.width / 2
           - tooltip.offsetWidth / 2;

  // Does it overflow the bottom? Flip above
  if (top + tooltip.offsetHeight > window.innerHeight) {
    top = rect.top - tooltip.offsetHeight - 8;
  }

  // Does it overflow the right edge? Shift left
  if (left + tooltip.offsetWidth > window.innerWidth) {
    left = window.innerWidth - tooltip.offsetWidth - 8;
  }

  tooltip.style.top = \`\${top}px\`;
  tooltip.style.left = \`\${left}px\`;
}

// And you need to re-run this on scroll, resize, DOM changes…`}
      </Code>
    </Slide>
  );
}
