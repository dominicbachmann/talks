import { Code, Slide } from "@revealjs/react";
import { gray, red } from "../../shared/colors";

export function PhysicalLayout() {
  return (
    <Slide>
      <h2>A card layout with physical properties</h2>
      <Code language="css" lineNumbers="2-5|6-7|8" trim>
        {`.card {
  margin-left: 24px;
  margin-right: 24px;
  padding-left: 16px;
  padding-right: 16px;
  border-left: 3px solid #58a6ff;
  border-right: none;
  text-align: left;
}

.card-icon {
  float: left;
  margin-right: 12px;
}

.card-badge {
  position: absolute;
  right: 8px;
  top: 8px;
}`}
      </Code>
      <p
        style={{
          fontSize: "0.8em",
          color: gray,
          marginTop: "0.6em",
        }}
      >
        Every property here encodes a physical direction. This card assumes
        the user reads left-to-right — the accent border is on the{" "}
        <code style={{ color: red }}>left</code>, the badge is pinned{" "}
        <code style={{ color: red }}>right</code>, text is aligned{" "}
        <code style={{ color: red }}>left</code>.
      </p>
    </Slide>
  );
}
