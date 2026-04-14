import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { buildHighlightedHtml } from "../shared/DemoSlide";

const COLOR = "oklch(53.18% .28 296.97)";

export function FormModelDesignSectionOpener() {
  return <SectionOpener number="03" title="Form Model Design" color={COLOR} />;
}

function CodePanel({
  code,
  language,
  opacity = 1,
}: {
  code: string;
  language: string;
  opacity?: number;
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
        opacity,
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

// ---------- Slide 2: Form Model vs Domain Model ----------

const domainModelSnippet = `interface User {
  id: string;
  email: string;
  createdAt: Date;
  roles: Role[];
  lastLoginAt: Date | null;
  // ...20 more fields
}`;

const formModelSnippet = `profileModel = signal({
  displayName: '',
  bio: '',
  avatarUrl: '',
});`;

export function FormVsDomainSlide() {
  return (
    <ContentSlideFrame
      title="Form Model vs Domain Model"
      subhead="They serve different jobs — the domain describes your data, the form describes what the user edits."
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
          <div style={columnCaptionStyle}>Domain Model</div>
          <CodePanel code={domainModelSnippet} language="typescript" />
          <div style={noteStyle}>Mirrors the API / database</div>
        </div>
        <div>
          <div style={columnCaptionStyle}>Form Model</div>
          <CodePanel code={formModelSnippet} language="typescript" />
          <div style={noteStyle}>Mirrors the UI — only what's edited</div>
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 3: Best Practices overview ----------

const bestPractices = [
  "Initialize every field",
  "Keep models focused",
  "Group fields that validate together",
  "Match data types to UI controls",
  "No dynamic structure",
];

export function BestPracticesSlide() {
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
            fontSize: "1.8em",
            fontWeight: 700,
            color: COLOR,
            margin: "0 0 0.6em",
          }}
        >
          Best Practices
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {bestPractices.map((item, i) => (
            <li
              key={i}
              className="fragment"
              data-fragment-index={i}
              style={{
                fontSize: "1.15em",
                fontWeight: 500,
                color: "oklch(80% .01 0)",
                padding: "0.3em 0",
                paddingLeft: "1em",
                borderLeft: `3px solid ${COLOR}`,
                marginBottom: "0.3em",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}

// ---------- Slide 4: Initialize all fields ----------

const initBadSnippet = `signupModel = signal({});`;

const initGoodSnippet = `signupModel = signal({
  name: '',
  email: '',
  password: '',
  acceptsTerms: false,
});`;

export function InitializeFieldsSlide() {
  return (
    <ContentSlideFrame
      title="Initialize every field"
      subhead="Give each field a starting value. No undefined, ever — it breaks the system."
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
          <div style={{ ...columnCaptionStyle, color: "oklch(65% .15 25)" }}>
            ✗ Avoid
          </div>
          <CodePanel code={initBadSnippet} language="typescript" />
        </div>
        <div>
          <div style={{ ...columnCaptionStyle, color: "oklch(75% .15 150)" }}>
            ✓ Do
          </div>
          <CodePanel code={initGoodSnippet} language="typescript" />
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 5: Keep models focused ----------

const focusedSnippet = `// One form — one focused model
profileModel = signal({
  displayName: user().displayName,
  bio: user().bio,
});

// Not the whole 30-field User entity
`;

export function KeepFocusedSlide() {
  return (
    <ContentSlideFrame
      title="Keep models focused"
      subhead="A form model describes what this form edits — not your entire domain. Model what the user sees, nothing more."
    >
      <CodePanel code={focusedSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 6: Group fields that validate together ----------

const groupValidateSnippet = `signupModel = signal({
  email: '',
  password: {
    new: '',
    confirm: '',       // validated against password.new
  },
});`;

export function GroupValidationSlide() {
  return (
    <ContentSlideFrame
      title="Group fields that validate together"
      subhead="Shape the model so related validation lives in one subtree — cross-field rules become local rules."
    >
      <CodePanel code={groupValidateSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 7: Match data types to UI controls ----------

const matchTypesSnippet = `eventModel = signal({
  startDate: null as Date | null,   // date picker
  capacity: 0,                       // number input
  tags: [] as string[],              // tag picker
  published: false,                  // toggle
});`;

export function MatchTypesSlide() {
  return (
    <ContentSlideFrame
      title="Match data types to UI controls"
      subhead="Pick the type the control actually produces — dates as Date, numbers as number, toggles as boolean. No string soup."
    >
      <CodePanel code={matchTypesSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 8: No dynamic structure (intro) ----------

const dynamicStructureRules = [
  "Initialize every object — don't leave objects null just because data hasn't loaded",
  "For unions, create both variants and add a discriminator field",
  "Arrays are the exception — they're meant to change size",
];

export function NoDynamicStructureSlide() {
  return (
    <ContentSlideFrame
      title="No dynamic structure"
      subhead="The tree of fields should be decidable at form-creation time. Field identities must stay stable."
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {dynamicStructureRules.map((rule, i) => (
          <li
            key={i}
            className="fragment"
            data-fragment-index={i}
            style={{
              fontSize: "1em",
              color: "oklch(80% .01 0)",
              padding: "0.4em 0",
              paddingLeft: "1em",
              borderLeft: `3px solid ${COLOR}`,
              marginBottom: "0.3em",
              lineHeight: 1.5,
            }}
          >
            {rule}
          </li>
        ))}
      </ul>
    </ContentSlideFrame>
  );
}

// ---------- Slide 9: Init all objects (primitives can be null) ----------

const objectBadSnippet = `// Object starts as null — structure is dynamic
profileModel = signal<Profile | null>(null);`;

const objectGoodSnippet = `// Always have an object; null out primitives
profileModel = signal<Profile>({
  name: '',
  age: null,          // nullable primitive — fine
  avatarUrl: null,    // nullable primitive — fine
});`;

export function InitObjectsSlide() {
  return (
    <ContentSlideFrame
      title="Init all objects"
      subhead="Primitives can be null. Objects can't — a null object means fields disappear, which breaks field identity."
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
          <div style={{ ...columnCaptionStyle, color: "oklch(65% .15 25)" }}>
            ✗ Avoid
          </div>
          <CodePanel code={objectBadSnippet} language="typescript" />
        </div>
        <div>
          <div style={{ ...columnCaptionStyle, color: "oklch(75% .15 150)" }}>
            ✓ Do
          </div>
          <CodePanel code={objectGoodSnippet} language="typescript" />
        </div>
      </div>
      <div className="fragment" style={{ marginTop: "1.2em", width: "100%" }}>
        <div style={noteStyle}>
          <strong style={{ color: "rgba(255,255,255,0.85)" }}>Exception:</strong>{" "}
          if the UI control sets the whole object at once and never reads into
          its fields, a nullable object is fine too.
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 10: Unions → discriminator field ----------

const unionBadSnippet = `// Dynamic union — shape depends on data
type Payment =
  | { kind: 'card'; number: string }
  | { kind: 'bank'; iban: string };`;

const unionGoodSnippet = `// Create both, select with a discriminator
paymentModel = signal({
  method: 'card' as 'card' | 'bank',
  card: { number: '' },
  bank: { iban: '' },
});

// Hide the inactive branch via schema metadata:
hidden(schema.bank, ({ valueOf }) =>
  valueOf(schema.method) !== 'bank'
);`;

export function UnionDiscriminatorSlide() {
  return (
    <ContentSlideFrame
      title="Unions → discriminator + UI logic"
      subhead="Model both variants side by side. A discriminator picks which is active; metadata hides the rest."
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
          <div style={{ ...columnCaptionStyle, color: "oklch(65% .15 25)" }}>
            ✗ Avoid
          </div>
          <CodePanel code={unionBadSnippet} language="typescript" />
        </div>
        <div>
          <div style={{ ...columnCaptionStyle, color: "oklch(75% .15 150)" }}>
            ✓ Do
          </div>
          <CodePanel code={unionGoodSnippet} language="typescript" />
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 11: Mapping domain → form with linkedSignal ----------

const linkedSignalSnippet = `user = httpResource<User>(() => \`/api/users/\${id()}\`);

profileModel = linkedSignal(() => ({
  displayName: user.value()?.displayName ?? '',
  bio: user.value()?.bio ?? '',
}));`;

const linkedSignalHideSnippet = `disabled(schema, () => user.isLoading());
hidden(schema, () => user.error() !== undefined);`;

export function LinkedSignalMappingSlide() {
  return (
    <ContentSlideFrame
      title="Map domain → form with linkedSignal"
      subhead="Derive the form model from a source signal — when the source changes, the form resets to match."
    >
      <CodePanel code={linkedSignalSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

export function LinkedSignalGatingSlide() {
  return (
    <ContentSlideFrame
      title="Gate the form while the source loads"
      subhead="Disable or hide the form until the domain data is available."
    >
      <CodePanel code={linkedSignalHideSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 12: Two-way sync with effect ----------

const effectSyncSnippet = `domainModel = signal<Profile>({ displayName: '', bio: '' });
profileModel = linkedSignal(() => this.domainModel());
profileForm = form(this.profileModel);

// Push form edits back to the domain
effect(() => {
  this.domainModel.set(this.profileForm().value());
});`;

export function TwoWaySyncSlide() {
  return (
    <ContentSlideFrame
      title="Two-way sync with effect"
      subhead="For write-back to a domain source, an effect is the right tool — read the form's value, write to the source."
    >
      <CodePanel code={effectSyncSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}
