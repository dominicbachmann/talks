import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { DemoSlide, buildHighlightedHtml } from "../shared/DemoSlide";
import simpleTs from "../../demos/src/app/demos/simple-form-model/simple-form-model.ts?raw";
import simpleHtml from "../../demos/src/app/demos/simple-form-model/simple-form-model.html?raw";
import simpleCss from "../../demos/src/app/demos/simple-form-model/simple-form-model.css?raw";
import fieldStateTs from "../../demos/src/app/demos/field-state/field-state.ts?raw";
import fieldStateHtml from "../../demos/src/app/demos/field-state/field-state.html?raw";
import fieldStateCss from "../../demos/src/app/demos/field-state/field-state.css?raw";

const COLOR = "oklch(65.44% .274 30.17)";

export function FormModelsSectionOpener() {
  return <SectionOpener number="02" title="Form Models" color={COLOR} />;
}

export function SimpleFormModelSlide() {
  return (
    <DemoSlide
      title="Simple Form"
      src="http://localhost:4200/simple-form-model"
      color={COLOR}
      tabs={[
        { label: "TS", code: simpleTs, language: "typescript" },
        { label: "HTML", code: simpleHtml, language: "html" },
        { label: "CSS", code: simpleCss, language: "css" },
      ]}
    />
  );
}

export function FieldStateSlide() {
  return (
    <DemoSlide
      title="Field State"
      src="http://localhost:4200/field-state"
      color={COLOR}
      tabs={[
        { label: "TS", code: fieldStateTs, language: "typescript" },
        { label: "HTML", code: fieldStateHtml, language: "html" },
        { label: "CSS", code: fieldStateCss, language: "css" },
      ]}
    />
  );
}

const modelContextSnippet = `profileModel = signal({ username: '', age: 25 });`;

const fieldUpdateSnippets: { caption: string; code: string }[] = [
  {
    caption: "set() — replace a field's value",
    code: `profileForm.username().value.set('alice');`,
  },
  {
    caption: "update() — derive the next value from the current one",
    code: `profileForm.age().value.update(n => n + 3);`,
  },
];

const writeModelSnippet = `profileModel.set({ username: 'alice', age: 28 });`;

function CodePanel({ code, language }: { code: string; language: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: "0.75em 1em",
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        overflow: "auto",
      }}
    >
      <code
        className={`language-${language}`}
        style={{ fontSize: "0.65em", background: "transparent" }}
        dangerouslySetInnerHTML={{
          __html: buildHighlightedHtml(code, language),
        }}
      />
    </pre>
  );
}

function UpdatingSlideFrame({
  title,
  subhead,
  children,
}: {
  title: string;
  subhead: string;
  children: React.ReactNode;
}) {
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
            fontSize: "1.6em",
            fontWeight: 700,
            color: COLOR,
            margin: "0 0 0.3em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "0.95em",
            color: "oklch(65% .01 0)",
            margin: "0 0 1em",
            lineHeight: 1.5,
          }}
        >
          {subhead}
        </p>
        <div style={{ marginBottom: "1em", width: "100%", opacity: 0.7 }}>
          <CodePanel code={modelContextSnippet} language="typescript" />
        </div>
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </Slide>
  );
}

export function UpdatingFormModelsSlide() {
  return (
    <UpdatingSlideFrame
      title="Updating a Field"
      subhead="Each field's value is a writable signal — call set() or update() on it."
    >
      {fieldUpdateSnippets.map((snippet, i) => (
        <div
          key={i}
          className="fragment"
          data-fragment-index={i}
          style={{ marginBottom: "0.9em" }}
        >
          <div
            style={{
              fontSize: "0.8em",
              color: "oklch(65% .01 0)",
              marginBottom: "0.3em",
              paddingLeft: "0.2em",
            }}
          >
            {snippet.caption}
          </div>
          <CodePanel code={snippet.code} language="typescript" />
        </div>
      ))}
    </UpdatingSlideFrame>
  );
}

export function WritingTheModelSlide() {
  return (
    <UpdatingSlideFrame
      title="Updating a field"
      subhead=""
    >
      <div
        style={{
          fontSize: "0.8em",
          color: "oklch(65% .01 0)",
          marginBottom: "0.3em",
          paddingLeft: "0.2em",
        }}
      >
        Replace every field in one call
      </div>
      <CodePanel code={writeModelSnippet} language="typescript" />
    </UpdatingSlideFrame>
  );
}

const twoWaySnippet = `<input [formField]="profileForm.username" />`;

const flatModelSnippet = `userModel = signal({
  name: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zip: '',
});`;

const nestedModelSnippet = `userModel = signal({
  name: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
});`;

const arrayModelSnippet = `orderModel = signal({
  customerName: '',
  items: [
    { product: '', quantity: 0, price: 0 },
  ],
});`;

const flatReasons = [
  "No clear conceptual groupings",
  "Simpler field access",
  "Validation spans multiple groups",
];

const nestedReasons = [
  "Fields form a conceptual group",
  "Grouped data matches your API",
  "Validate the group as a unit",
];

function ContentSlideFrame({
  title,
  subhead,
  children,
}: {
  title: string;
  subhead?: string;
  children: React.ReactNode;
}) {
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
            fontSize: "1.6em",
            fontWeight: 700,
            color: COLOR,
            margin: "0 0 0.3em",
          }}
        >
          {title}
        </h2>
        {subhead ? (
          <p
            style={{
              fontSize: "0.9em",
              color: "oklch(65% .01 0)",
              margin: "0 0 1em",
              lineHeight: 1.5,
            }}
          >
            {subhead}
          </p>
        ) : (
          <div style={{ height: "1em" }} />
        )}
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </Slide>
  );
}

const columnCaptionStyle: React.CSSProperties = {
  fontSize: "0.85em",
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
  marginBottom: "0.4em",
  paddingLeft: "0.2em",
};

const accessNoteStyle: React.CSSProperties = {
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "0.7em",
  color: "oklch(65% .01 0)",
  marginTop: "0.6em",
  paddingLeft: "0.2em",
};

export function FlatVsNestedSlide() {
  return (
    <ContentSlideFrame
      title="Flat vs Nested"
      subhead="Shape the model to match the data"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5em",
          width: "100%",
        }}
      >
        <div>
          <div style={columnCaptionStyle}>Flat</div>
          <CodePanel code={flatModelSnippet} language="typescript" />
          <div style={accessNoteStyle}>userForm.city</div>
        </div>
        <div>
          <div style={columnCaptionStyle}>Nested</div>
          <CodePanel code={nestedModelSnippet} language="typescript" />
          <div style={accessNoteStyle}>userForm.address.city</div>
        </div>
      </div>
    </ContentSlideFrame>
  );
}

export function StructureGuidanceSlide() {
  return (
    <ContentSlideFrame title="Choosing a structure">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2em",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "1em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "0.6em",
            }}
          >
            Flat — when
          </div>
          <ul
            style={{
              fontSize: "0.85em",
              color: "oklch(80% .01 0)",
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: "1.2em",
            }}
          >
            {flatReasons.map((reason, i) => (
              <li key={i} style={{ marginBottom: "0.3em" }}>
                {reason}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            style={{
              fontSize: "1em",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "0.6em",
            }}
          >
            Nested — when
          </div>
          <ul
            style={{
              fontSize: "0.85em",
              color: "oklch(80% .01 0)",
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: "1.2em",
            }}
          >
            {nestedReasons.map((reason, i) => (
              <li key={i} style={{ marginBottom: "0.3em" }}>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentSlideFrame>
  );
}

export function ArraysSlide() {
  return (
    <ContentSlideFrame
      title="Arrays"
      subhead="Arrays work naturally"
    >
      <div style={{ width: "100%", marginBottom: "0.8em" }}>
        <CodePanel code={arrayModelSnippet} language="typescript" />
      </div>
      <div style={accessNoteStyle}>
        Access an item: orderForm.items[0].product
      </div>
    </ContentSlideFrame>
  );
}

export function TwoWayBindingSlide() {
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
            fontSize: "1.6em",
            fontWeight: 700,
            color: COLOR,
            margin: "0 0 0.3em",
          }}
        >
          Binding a Field
        </h2>
        <p
          style={{
            fontSize: "0.9em",
            color: "oklch(65% .01 0)",
            margin: "0 0 1em",
            lineHeight: 1.5,
          }}
        >
          Wire a field to a control with the{" "}
          <code
            style={{
              background: "#0d1117",
              padding: "0.1em 0.4em",
              borderRadius: 4,
              fontSize: "0.9em",
            }}
          >
            [formField]
          </code>{" "}
          directive
        </p>
        <div style={{ width: "100%" }}>
          <CodePanel code={twoWaySnippet} language="html" />
        </div>
      </div>
    </Slide>
  );
}
