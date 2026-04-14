import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { buildHighlightedHtml } from "../shared/DemoSlide";

const COLOR = "oklch(69.02% .277 332.77)";

export function ValidationSectionOpener() {
  return <SectionOpener number="05" title="Validation" color={COLOR} />;
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

// ---------- Slide 2: SchemaPath ----------

const schemaPathSnippet = `loginForm = form(this.loginModel, schemaPath => {
  required(schemaPath.email, { message: 'Email is required' });
  email(schemaPath.email, { message: 'Enter a valid email address' });
});`;

export function SchemaPathSlide() {
  return (
    <ContentSlideFrame
      title="Schema path"
      subhead="Validation rules live in the schema callback — it receives a SchemaPath with an entry for every field in the model."
    >
      <CodePanel code={schemaPathSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 3: Built-in validation functions ----------

const builtInSnippet = `required(schema.email, { message: 'Email is required' });
email(schema.email);
min(schema.age, 18, { message: 'Must be 18 or older' });
max(schema.rating, 5);
minLength(schema.password, 8);
maxLength(schema.bio, 500);
pattern(schema.phone, /^\\d{3}-\\d{3}-\\d{4}$/);`;

export function BuiltInValidatorsSlide() {
  return (
    <ContentSlideFrame
      title="Built-in validators"
      subhead="Presence, format, range, length, regex — each takes a { message } option for a custom error message."
    >
      <CodePanel code={builtInSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 4: Timing ----------

const timingSteps: { title: string; detail?: string }[] = [
  {
    title: "Synchronous rules run on value change",
    detail: "Rules on hidden or disabled fields are skipped",
  },
  {
    title: "Async rules run only after sync passes",
  },
  {
    title: "Field state signals update",
    detail: "valid(), invalid(), errors(), pending()",
  },
];

export function ValidationTimingSlide() {
  return (
    <ContentSlideFrame
      title="Validation timing"
      subhead="Validation runs in a fixed order whenever a dependency changes."
    >
      <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "step" }}>
        {timingSteps.map((step, i) => (
          <li
            key={i}
            style={{
              padding: "0.5em 0 0.5em 1em",
              borderLeft: `3px solid ${COLOR}`,
              marginBottom: "0.3em",
              counterIncrement: "step",
            }}
          >
            <div
              style={{
                fontSize: "1em",
                color: "oklch(85% .01 0)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  color: COLOR,
                  fontWeight: 700,
                  marginRight: "0.6em",
                }}
              >
                {i + 1}.
              </span>
              {step.title}
            </div>
            {step.detail ? (
              <div
                style={{
                  fontSize: "0.8em",
                  color: "oklch(65% .01 0)",
                  marginTop: "0.2em",
                  paddingLeft: "1.6em",
                  fontFamily:
                    step.detail.includes("()")
                      ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                      : undefined,
                }}
              >
                {step.detail}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </ContentSlideFrame>
  );
}

// ---------- Slide 5: Array items — applyEach ----------

const applyEachSnippet = `function ItemSchema(item: SchemaPath<Item>) {
  required(item.name);
  min(item.quantity, 1);
}

orderForm = form(this.orderModel, schema => {
  applyEach(schema.items, ItemSchema);
});`;

export function ApplyEachSlide() {
  return (
    <ContentSlideFrame
      title="Validating array items"
      subhead="applyEach runs a sub-schema against every item — pull the item rules into their own function for reuse."
    >
      <CodePanel code={applyEachSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 6: Errors — structure + display ----------

const errorShapeSnippet = `interface FormError {
  kind: string;       // 'required', 'email', …
  message?: string;   // optional, human-readable
}`;

const errorDisplaySnippet = `@if (form.email().touched() && form.email().invalid()) {
  @for (error of form.email().errors(); track error) {
    <p class="error">{{ error.message }}</p>
  }
}`;

export function ValidationErrorsSlide() {
  return (
    <ContentSlideFrame
      title="Validation errors"
      subhead="Every error has a stable kind and an optional message — read them off errors() and gate on touched()."
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
          <div style={columnCaptionStyle}>Shape</div>
          <CodePanel code={errorShapeSnippet} language="typescript" />
        </div>
        <div>
          <div style={columnCaptionStyle}>Display</div>
          <CodePanel code={errorDisplaySnippet} language="html" />
        </div>
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 7: Custom validate() ----------

const validateSnippet = `validate(schema.website, ({ value }) => {
  if (!value().startsWith('https://')) {
    return {
      kind: 'https',
      message: 'URL must start with https://',
    };
  }
  return null;
});`;

export function CustomValidateSlide() {
  return (
    <ContentSlideFrame
      title="Custom rules — validate()"
      subhead="Return an error object on failure, or null when the value is valid."
    >
      <CodePanel code={validateSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 8: validateTree() ----------

const validateTreeSnippet = `validateTree(schema, ctx => {
  if (ctx.valueOf(schema.firstName).length < 2) {
    return {
      kind: 'minLength',
      message: 'First name is too short',
      fieldTree: ctx.fieldTreeOf(schema.firstName),
    };
  }
  return null;
});`;

export function ValidateTreeSlide() {
  return (
    <ContentSlideFrame
      title="Tree-level rules — validateTree()"
      subhead="Validate across multiple fields — attach the error to a specific field via fieldTree."
    >
      <CodePanel code={validateTreeSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 9: Reusable validators ----------

const reusableSnippet = `function url(path: SchemaPath<string>, opts?: { message?: string }) {
  validate(path, ({ value }) => {
    try { new URL(value()); return null; }
    catch {
      return { kind: 'url', message: opts?.message ?? 'Enter a valid URL' };
    }
  });
}

// Use it like a built-in
url(schema.website, { message: 'Please enter a valid website URL' });`;

export function ReusableValidatorSlide() {
  return (
    <ContentSlideFrame
      title="Reusable validation rules"
      subhead="Wrap validate() in a function — now it looks and composes like a built-in."
    >
      <CodePanel code={reusableSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 10: Cross-field validation ----------

const crossFieldSnippet = `validate(schema.confirmPassword, ({ value, valueOf }) => {
  if (value() !== valueOf(schema.password)) {
    return {
      kind: 'passwordMismatch',
      message: 'Passwords do not match',
    };
  }
  return null;
});`;

export function CrossFieldValidationSlide() {
  return (
    <ContentSlideFrame
      title="Cross-field validation"
      subhead="valueOf() reads another field's value — the validator re-runs reactively when either side changes."
    >
      <CodePanel code={crossFieldSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 11: Async — validateHttp + pending ----------

const validateHttpSnippet = `validateHttp(schema.username, {
  request: ({ value }) => \`/api/check-username?username=\${value()}\`,
  onSuccess: (res) => res.taken
    ? { kind: 'taken', message: 'Username is already taken' }
    : null,
  onError: () => ({ kind: 'networkError', message: 'Try again' }),
});`;

const pendingSnippet = `@if (form.username().pending()) {
  <span class="spinner">Checking…</span>
}`;

export function AsyncValidationSlide() {
  return (
    <ContentSlideFrame
      title="Async validation"
      subhead="validateHttp runs after sync rules pass. pending() is true while the request is in flight."
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={validateHttpSnippet} language="typescript" />
      </div>
      <CodePanel code={pendingSnippet} language="html" />
      <div style={noteStyle}>
        valid() stays false while pending — prefer invalid() for error styling.
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 12: Standard Schema integration ----------

const standardSchemaSnippet = `import { validateStandardSchema } from '@angular/forms/signals';
import * as z from 'zod';

const userSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

userForm = form(this.userModel, schema =>
  validateStandardSchema(schema, userSchema),
);`;

export function StandardSchemaSlide() {
  return (
    <ContentSlideFrame
      title="Schema validation libraries"
      subhead="validateStandardSchema plugs in any Standard Schema library — Zod, Valibot, and so on."
    >
      <CodePanel code={standardSchemaSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 13: Cross-field validation — before & after ----------

const reactiveCrossFieldTs = `form = this.fb.group(
  { startDate: [''], endDate: [''] },
  { validators: [dateRange] },
);

function dateRange(g: AbstractControl): ValidationErrors | null {
  const start = g.get('startDate')!.value;
  const end = g.get('endDate')!.value;
  return start && end && start > end ? { dateRange: true } : null;
}`;

const reactiveCrossFieldHtml = `<!-- error lives on the group, not endDate -->
@if (form.errors?.['dateRange']) {
  <p>End must be after start</p>
}`;

const signalCrossFieldTs = `rangeForm = form(this.model, schema => {
  validateTree(schema, ctx => {
    const start = ctx.valueOf(schema.startDate);
    const end = ctx.valueOf(schema.endDate);
    if (start && end && start > end) {
      return {
        kind: 'dateRange',
        message: 'End must be after start',
        fieldTree: ctx.fieldTreeOf(schema.endDate),
      };
    }
    return null;
  });
});`;

const signalCrossFieldHtml = `<!-- error lives right on endDate -->
@for (e of rangeForm.endDate().errors(); track e) {
  <p>{{ e.message }}</p>
}`;

function TwoColumnComparison({
  left,
  right,
  leftCaption,
  rightCaption,
  language,
}: {
  left: string;
  right: string;
  leftCaption: string;
  rightCaption: string;
  language: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5em",
        width: "100%",
      }}
    >
      <div>
        <div style={columnCaptionStyle}>{leftCaption}</div>
        <CodePanel code={left} language={language} />
      </div>
      <div>
        <div style={columnCaptionStyle}>{rightCaption}</div>
        <CodePanel code={right} language={language} />
      </div>
    </div>
  );
}

export function CrossFieldValidatorComparisonSlide() {
  return (
    <ContentSlideFrame
      title="Cross-field validation — the validator"
      subhead=""
    >
      <TwoColumnComparison
        left={reactiveCrossFieldTs}
        right={signalCrossFieldTs}
        leftCaption="Before — Reactive Forms"
        rightCaption="After — Signal Forms"
        language="typescript"
      />
    </ContentSlideFrame>
  );
}

export function CrossFieldTemplateComparisonSlide() {
  return (
    <ContentSlideFrame
      title="Cross-field validation — the template"
      subhead="Because the error lives on endDate, rendering it is just like any other error."
    >
      <TwoColumnComparison
        left={reactiveCrossFieldHtml}
        right={signalCrossFieldHtml}
        leftCaption="Before — Reactive Forms"
        rightCaption="After — Signal Forms"
        language="html"
      />
    </ContentSlideFrame>
  );
}
