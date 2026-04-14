import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { buildHighlightedHtml } from "../shared/DemoSlide";

const COLOR = "oklch(61.1% .279 314.87)";

export function FieldStateSectionOpener() {
  return <SectionOpener number="04" title="Field State Management" color={COLOR} />;
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

// ---------- Slide 2: Accessing field state ----------

const accessFieldSnippet = `// Call the field to get its FieldState
const state = loginForm.email();

// Then read the signals you care about
state.value();    // WritableSignal<string>
state.valid();    // Signal<boolean>
state.errors();   // Signal<FormError[]>
state.touched();  // Signal<boolean>`;

export function AccessingFieldStateSlide() {
  return (
    <ContentSlideFrame
      title="Accessing field state"
      subhead="Every field is callable — invoke it to get a FieldState object that exposes signals for value, validity, and interaction."
    >
      <CodePanel code={accessFieldSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 3: Field state signals overview ----------

const stateCategories: { title: string; items: string[] }[] = [
  {
    title: "Validation",
    items: ["valid()", "invalid()", "errors()", "pending()"],
  },
  {
    title: "Interaction",
    items: ["touched()", "dirty()"],
  },
  {
    title: "Availability",
    items: ["disabled()", "hidden()", "readonly()"],
  },
];

export function FieldStateSignalsSlide() {
  return (
    <ContentSlideFrame
      title="Field state signals"
      subhead="Three categories covering what the field contains, how the user interacted with it, and whether it's active."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1.5em",
          width: "100%",
        }}
      >
        {stateCategories.map((category) => (
          <div key={category.title}>
            <div style={columnCaptionStyle}>{category.title}</div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.8em",
                color: "oklch(80% .01 0)",
                lineHeight: 1.8,
              }}
            >
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 4: Validation state ----------

const validationStateSnippet = `@if (signupForm.email().touched() && signupForm.email().invalid()) {
  <p class="error">{{ signupForm.email().errors()[0].message }}</p>
}

@if (signupForm.email().pending()) {
  <p>Checking availability…</p>
}`;

export function ValidationStateSlide() {
  return (
    <ContentSlideFrame
      title="Validation state"
      subhead="Read invalid() and errors() to show feedback — gate on touched() so messages only appear after interaction."
    >
      <CodePanel code={validationStateSnippet} language="html" />
      <div style={noteStyle}>
        Prefer <code>invalid()</code> over <code>!valid()</code> — both can be{" "}
        <code>false</code> while async validation is pending.
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 5: Disabled ----------

const disabledSchemaSnippet = `orderForm = form(this.orderModel, schema => {
  disabled(schema.couponCode, ({ valueOf }) =>
    valueOf(schema.total) < 50
  );
});`;

const disabledTemplateSnippet = `<input [formField]="orderForm.couponCode" />

@if (orderForm.couponCode().disabled()) {
  <p class="info">Coupon available on orders over $50</p>
}`;

export function DisabledSlide() {
  return (
    <ContentSlideFrame
      title="Disabled"
      subhead="Declare disabled state in the schema — the [formField] directive binds the disabled attribute automatically."
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
          <div style={columnCaptionStyle}>Schema</div>
          <CodePanel code={disabledSchemaSnippet} language="typescript" />
        </div>
        <div>
          <div style={columnCaptionStyle}>Template</div>
          <CodePanel code={disabledTemplateSnippet} language="html" />
        </div>
      </div>
      <div style={noteStyle}>
        Disabled fields stay visible but don't contribute to parent validity.
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 6: Form-level state ----------

const formLevelSnippet = `// The form root is itself a field — state aggregates up the tree
loginForm().valid()     // all interactive fields valid
loginForm().dirty()     // any field was modified
loginForm().pending()   // any async validator running`;

const formLevelTemplateSnippet = `<button [disabled]="!loginForm().valid()">Sign In</button>

@if (loginForm().dirty()) {
  <p>You have unsaved changes</p>
}`;

export function FormLevelStateSlide() {
  return (
    <ContentSlideFrame
      title="Form-level state"
      subhead="The root form aggregates state across all child fields — read it for submit gating and change tracking."
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={formLevelSnippet} language="typescript" />
      </div>
      <CodePanel code={formLevelTemplateSnippet} language="html" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 7: Field-level vs form-level guidance ----------

const fieldLevelUses = [
  "Individual error messages",
  "Field-specific styling",
  "Per-field validation feedback",
  "Conditional field availability",
];

const formLevelUses = [
  "Submit / save button state",
  "Overall validity checks",
  "Unsaved changes warnings",
];

export function FieldVsFormLevelSlide() {
  return (
    <ContentSlideFrame
      title="Where to read state"
      subhead="Scope the read to the scope of the UI concern — field state for local feedback, form state for global actions."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2em",
          width: "100%",
        }}
      >
        <div>
          <div style={columnCaptionStyle}>Field-level — for</div>
          <ul
            style={{
              fontSize: "0.85em",
              color: "oklch(80% .01 0)",
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: "1.2em",
            }}
          >
            {fieldLevelUses.map((item) => (
              <li key={item} style={{ marginBottom: "0.3em" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={columnCaptionStyle}>Form-level — for</div>
          <ul
            style={{
              fontSize: "0.85em",
              color: "oklch(80% .01 0)",
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: "1.2em",
            }}
          >
            {formLevelUses.map((item) => (
              <li key={item} style={{ marginBottom: "0.3em" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 8: Form submission — FormRoot ----------

const formRootSnippet = `<form [formRoot]="registrationForm">
  <input [formField]="registrationForm.username" />
  <input type="email" [formField]="registrationForm.email" />
  <input type="password" [formField]="registrationForm.password" />

  <button type="submit">Register</button>
</form>`;

const formRootBehaviors = [
  "Prevents default browser submission",
  "Adds novalidate on the <form> element",
  "Delegates submit to the form's submission action",
];

export function FormRootSlide() {
  return (
    <ContentSlideFrame
      title="Form submission — [formRoot]"
      subhead="Bind the form to the <form> element with the FormRoot directive — it takes over the native submit behavior."
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={formRootSnippet} language="html" />
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
        {formRootBehaviors.map((item) => (
          <li key={item} style={{ marginBottom: "0.2em" }}>
            {item}
          </li>
        ))}
      </ul>
    </ContentSlideFrame>
  );
}

// ---------- Slide 9: Submission action ----------

const submissionActionSnippet = `registrationForm = form(this.registrationModel, {
  submission: {
    action: async (f) => {
      await this.api.register(f().value());
      f().reset();
    },
  },
});`;

const submissionBehaviors = [
  "Marks every field as touched — errors become visible",
  "Runs the action only if the form is valid",
  "reset() clears interaction state",
];

export function SubmissionActionSlide() {
  return (
    <ContentSlideFrame
      title="Submission action"
      subhead="Configure a submission action on the form — it runs when the form is submitted and the form is valid."
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={submissionActionSnippet} language="typescript" />
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
        {submissionBehaviors.map((item) => (
          <li key={item} style={{ marginBottom: "0.2em" }}>
            {item}
          </li>
        ))}
      </ul>
    </ContentSlideFrame>
  );
}
