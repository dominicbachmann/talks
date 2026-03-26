import { Slide } from "@revealjs/react";
import { green, gray, red } from "../../shared/colors";

function Row({ physical, logical }: { physical: string; logical: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#161b22",
        borderRadius: "6px",
        padding: "8px 16px",
      }}
    >
      <code style={{ color: red, flex: 1, textAlign: "right" }}>
        {physical}
      </code>
      <span style={{ color: "#484f58", fontSize: "1.1em" }}>→</span>
      <code style={{ color: green, flex: 1 }}>{logical}</code>
    </div>
  );
}

export function PropertyMappingInline() {
  return (
    <Slide>
      <h2>Physical → Logical: inline axis</h2>
      <div
        style={{
          marginTop: "0.6em",
          maxWidth: "680px",
          marginInline: "auto",
          fontSize: "0.72em",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Row physical="margin-left" logical="margin-inline-start" />
        <Row physical="padding-right" logical="padding-inline-end" />
        <Row physical="border-left" logical="border-inline-start" />
        <Row physical="text-align: left" logical="text-align: start" />
      </div>
      <p style={{ fontSize: "0.72em", color: gray, marginTop: "0.6em" }}>
        <code style={{ color: red }}>left/right</code> →{" "}
        <code style={{ color: green }}>inline-start/end</code> — the
        reading direction axis.
      </p>
    </Slide>
  );
}

export function PropertyMappingBlock() {
  return (
    <Slide>
      <h2>Physical → Logical: block axis &amp; sizing</h2>
      <div
        style={{
          marginTop: "0.6em",
          maxWidth: "680px",
          marginInline: "auto",
          fontSize: "0.72em",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Row physical="margin-top" logical="margin-block-start" />
        <Row physical="margin-bottom" logical="margin-block-end" />
        <Row physical="top / bottom" logical="inset-block-start / end" />
        <Row physical="width" logical="inline-size" />
        <Row physical="height" logical="block-size" />
      </div>
      <p style={{ fontSize: "0.72em", color: gray, marginTop: "0.6em" }}>
        <code style={{ color: red }}>top/bottom</code> →{" "}
        <code style={{ color: green }}>block-start/end</code> — the
        stacking direction axis.{" "}
        <code style={{ color: red }}>width/height</code> →{" "}
        <code style={{ color: green }}>inline-size/block-size</code>.
      </p>
    </Slide>
  );
}
