import { Code, Fragment, Slide } from "@revealjs/react";
import { gray, green } from "../../shared/colors";

export function TheLogicalFix() {
  return (
    <Slide>
      <h2>
        Replace with{" "}
        <span style={{ color: green }}>logical properties</span>
      </h2>
      <Code language="css" lineNumbers="2-5|6-7|8|12|17-18" trim>
        {`.card {
  margin-inline: 24px;
  padding-inline: 16px;
  border-inline-start: 3px solid #58a6ff;
  border-inline-end: none;
  text-align: start;
}

.card-icon {
  float: inline-start;
  margin-inline-end: 12px;
}

.card-badge {
  position: absolute;
  inset-inline-end: 8px;
  inset-block-start: 8px;
}`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: gray,
            marginTop: "0.6em",
          }}
        >
          Same visual result in LTR. In RTL, the border, badge, float, and
          alignment all flip automatically — <strong style={{ color: green }}>zero overrides</strong>. The{" "}
          <code style={{ color: green }}>margin-inline</code> shorthand
          sets both start and end in one declaration.
        </p>
      </Fragment>
    </Slide>
  );
}
