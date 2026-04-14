import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { buildHighlightedHtml } from "../shared/DemoSlide";

const COLOR = "oklch(59.91% .239 8.14)";

export function FormLogicSectionOpener() {
  return <SectionOpener number="06" title="Form Logic" color={COLOR} />;
}

function CodePanel({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
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
        style={{ fontSize: "0.6em", background: "transparent" }}
        dangerouslySetInnerHTML={{
          __html: buildHighlightedHtml(code, language),
        }}
      />
    </pre>
  );
}

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

const noteStyle: React.CSSProperties = {
  fontSize: "0.8em",
  color: "oklch(65% .01 0)",
  lineHeight: 1.5,
  marginTop: "0.6em",
};

// ---------- Slide 2: How rules work ----------

const howRulesSnippet = `orderForm = form(this.orderModel, schemaPath => {
  // Reactive logic function — re-runs when signals change
  disabled(schemaPath.couponCode, ({ valueOf }) =>
    valueOf(schemaPath.total) < 50
  );

  // Static form — no function needed
  disabled(schemaPath.systemId);

  // Return a string for a user-facing reason
  disabled(schemaPath.shipping, ({ valueOf }) =>
    valueOf(schemaPath.country) === 'XX'
      ? 'Shipping unavailable in this region'
      : false
  );
});`;

export function HowRulesWorkSlide() {
  return (
    <ContentSlideFrame
      title="How rules work"
      subhead="Rules take a SchemaPath and a reactive function — it re-runs whenever the signals it reads change, just like a computed."
    >
      <CodePanel code={howRulesSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 3: debounce (time) ----------

const debounceTimeSnippet = `form(this.searchModel, schemaPath => {
  debounce(schemaPath.query, 300);   // ms
});`;

const debounceBehaviors = [
  "Model updates are delayed while the user types",
  "Sync happens immediately on blur or form submit",
  "Validation still runs against the debounced value",
];

export function DebounceTimeSlide() {
  return (
    <ContentSlideFrame
      title="Debounce — fixed time"
      subhead="Delay model updates to batch rapid input — useful for expensive validators or derived state."
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={debounceTimeSnippet} language="typescript" />
      </div>
      <ul
        style={{
          fontSize: "0.8em",
          color: "oklch(80% .01 0)",
          lineHeight: 1.5,
          margin: 0,
          paddingLeft: "1.2em",
        }}
      >
        {debounceBehaviors.map((item) => (
          <li key={item} style={{ marginBottom: "0.2em" }}>
            {item}
          </li>
        ))}
      </ul>
    </ContentSlideFrame>
  );
}

// ---------- Slide 4: debounce (promise) ----------

const debouncePromiseSnippet = `debounce(schemaPath.query, () => {
  // Return a Promise to delay; return undefined to sync now
  return new Promise<void>(resolve => {
    requestIdleCallback(() => resolve());
  });
});`;

export function DebouncePromiseSlide() {
  return (
    <ContentSlideFrame
      title="Debounce — custom scheduling"
      subhead="Pass a function returning a Promise for full control — resolve when it's time to sync, return undefined to sync now."
    >
      <CodePanel code={debouncePromiseSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 5: Metadata (basics) ----------

const metadataSnippet = `export const PLACEHOLDER = createMetadataKey<string>();
export const HELP = createMetadataKey<string>();

form(this.profileModel, schemaPath => {
  metadata(schemaPath.email, PLACEHOLDER, () => 'you@example.com');
  metadata(schemaPath.bio, HELP, () => 'A short bio — max 160 chars');
});

// Read it from the field state
profileForm.email().metadata(PLACEHOLDER);   // 'you@example.com'`;

const metadataPredefined = [
  "REQUIRED, MIN, MAX",
  "MIN_LENGTH, MAX_LENGTH, PATTERN",
];

export function MetadataSlide() {
  return (
    <ContentSlideFrame
      title="Metadata"
      subhead="Attach arbitrary data to a field — placeholders, help text, icons — readable from custom controls."
    >
      <div style={{ marginBottom: "0.6em" }}>
        <CodePanel code={metadataSnippet} language="typescript" />
      </div>
      <div style={noteStyle}>
        Built-in validators publish their own keys:{" "}
        <span
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            color: "oklch(80% .01 0)",
          }}
        >
          {metadataPredefined.join(" · ")}
        </span>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 6: Metadata reducers ----------

const metadataReducerSnippet = `const HINTS = createMetadataKey<string, string[]>(MetadataReducer.list());

form(this.signupModel, schemaPath => {
  metadata(schemaPath.password, HINTS, () => 'At least 8 characters');
  metadata(schemaPath.password, HINTS, () => 'Include a number');
});

signupForm.password().metadata(HINTS); // ['At least 8 characters', 'Include a number']`;

export function MetadataReducersSlide() {
  return (
    <ContentSlideFrame
      title="Metadata reducers"
      subhead="Default is last-write-wins. Pass a reducer to combine values — list() for arrays, min()/max() for numbers, or()/and() for booleans."
    >
      <CodePanel code={metadataReducerSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 7: applyWhen ----------

const applyWhenSnippet = `form(this.addressModel, schemaPath => {
  applyWhen(
    schemaPath,
    ({ valueOf }) => valueOf(schemaPath.country) === 'US',
    schemaPath => {
      required(schemaPath.zipCode);
      pattern(schemaPath.zipCode, /^\\d{5}(-\\d{4})?$/);
    },
  );
});`;

export function ApplyWhenSlide() {
  return (
    <ContentSlideFrame
      title="applyWhen — conditional rule groups"
      subhead="Activate a whole block of rules based on a predicate — when it flips false, the rules stop applying."
    >
      <CodePanel code={applyWhenSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 8: Reusable schema functions ----------

const schemaFunctionSnippet = `function emailFieldConfig(path: SchemaPath<string>) {
  required(path, { message: 'Email is required' });
  email(path);
  debounce(path, 300);
  metadata(path, PLACEHOLDER, () => 'you@example.com');
}

// Use it like a built-in
contactForm = form(this.contactModel, schemaPath => {
  emailFieldConfig(schemaPath.email);
  emailFieldConfig(schemaPath.ccEmail);
});`;

export function SchemaFunctionsSlide() {
  return (
    <ContentSlideFrame
      title="Reusable schema functions"
      subhead="A schema callback is just a function on SchemaPath — extract shared rule groups and reuse them anywhere."
    >
      <CodePanel code={schemaFunctionSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}
