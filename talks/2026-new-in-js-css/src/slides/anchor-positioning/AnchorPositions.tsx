import { Slide, Code } from "@revealjs/react";
import { blue, gray } from "../../shared/colors";
import { CodeColumns, CodeColumn } from "../../shared/CodeColumns";

export function AnchorPositions() {
  return (
    <Slide>
      <h2>
        <code>anchor()</code> flexibility
      </h2>
      <p style={{ fontSize: "0.85em", color: gray, marginBottom: "0.6em" }}>
        Reference any edge of the anchor — above, below, beside, centered, or
        inside
      </p>
      <CodeColumns gap="1.2em" marginTop="0">
        <CodeColumn title="Above, centered" color={blue}>
          <Code language="css" trim>
            {`.tooltip {
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% -8px;
}`}
          </Code>
        </CodeColumn>
        <CodeColumn title="Right side" color={blue}>
          <Code language="css" trim>
            {`.tooltip {
  left: anchor(right);
  top: anchor(center);
  translate: 8px -50%;
}`}
          </Code>
        </CodeColumn>
        <CodeColumn title="Badge in corner" color={blue}>
          <Code language="css" trim>
            {`.badge {
  bottom: anchor(top);
  left: anchor(right);
  translate: -50% 50%;
}`}
          </Code>
        </CodeColumn>
      </CodeColumns>
      <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.8em" }}>
        <code>anchor(top)</code>, <code>anchor(bottom)</code>,{" "}
        <code>anchor(left)</code>, <code>anchor(right)</code>,{" "}
        <code>anchor(center)</code> — five values that replace all the manual
        math.
      </p>
    </Slide>
  );
}
