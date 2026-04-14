import { Slide } from "@revealjs/react";
import { SectionOpener } from "../shared/SectionOpener";
import { DemoSlide, buildHighlightedHtml } from "../shared/DemoSlide";
import cvaReactiveTs from "../../demos/src/app/demos/custom-control-reactive/custom-control-reactive.ts?raw";
import cvaReactiveHtml from "../../demos/src/app/demos/custom-control-reactive/custom-control-reactive.html?raw";
import cvaReactiveCss from "../../demos/src/app/demos/custom-control-reactive/custom-control-reactive.css?raw";
import fvcSignalTs from "../../demos/src/app/demos/custom-control-signal/custom-control-signal.ts?raw";
import fvcSignalHtml from "../../demos/src/app/demos/custom-control-signal/custom-control-signal.html?raw";
import fvcSignalCss from "../../demos/src/app/demos/custom-control-signal/custom-control-signal.css?raw";

const COLOR = "oklch(63.32% .24 31.68)";

export function CustomControlsSectionOpener() {
  return <SectionOpener number="07" title="Custom Controls" color={COLOR} />;
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

// ---------- Slide 2: FormValueControl ----------

const formValueControlSnippet = `@Component({
  selector: 'app-text-input',
  template: \`<input [value]="value()" (input)="value.set($any($event.target).value)" />\`,
})
export class TextInput implements FormValueControl<string> {
  value = model('');
}`;

export function FormValueControlSlide() {
  return (
    <ContentSlideFrame
      title="FormValueControl"
      subhead="For controls that edit a single value — inputs, selects, date pickers. All it needs is a value model signal."
    >
      <CodePanel code={formValueControlSnippet} language="typescript" />
      <div style={noteStyle}>
        Use it with <code>[formField]</code> — the directive binds the field's
        value signal to the control's <code>value</code> model automatically.
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 3: FormCheckboxControl ----------

const formCheckboxControlSnippet = `@Component({
  selector: 'app-toggle',
  template: \`<button role="switch" [class.on]="checked()" (click)="checked.update(v => !v)"></button>\`,
})
export class Toggle implements FormCheckboxControl {
  checked = model(false);
}`;

export function FormCheckboxControlSlide() {
  return (
    <ContentSlideFrame
      title="FormCheckboxControl"
      subhead="For boolean on/off controls — checkboxes, switches, toggles. All it needs is a checked model signal."
    >
      <CodePanel code={formCheckboxControlSnippet} language="typescript" />
      <div style={noteStyle}>
        A control implements one or the other —{" "}
        <code>value</code> and <code>checked</code> are mutually exclusive.
      </div>
    </ContentSlideFrame>
  );
}

// ---------- Slide 4: Optional state signals ----------

const signalCategories: { title: string; items: string[] }[] = [
  {
    title: "Interaction",
    items: ["touched", "dirty"],
  },
  {
    title: "Validation",
    items: ["errors", "valid", "invalid", "pending"],
  },
  {
    title: "Availability",
    items: ["disabled", "disabledReasons", "readonly", "hidden"],
  },
  {
    title: "Constraints",
    items: ["required", "min", "max", "minLength", "maxLength", "pattern"],
  },
];

export function ControlStateSignalsSlide() {
  return (
    <ContentSlideFrame
      title="Optional state signals"
      subhead="Declare any subset — [formField] binds what's there, ignores the rest. input() for read-only state from the form, model() for state the control updates (like touched)."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "1.2em",
          width: "100%",
        }}
      >
        {signalCategories.map((category) => (
          <div key={category.title}>
            <div style={columnCaptionStyle}>{category.title}</div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.75em",
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

// ---------- Slide 5: Complete example ----------

const advancedControlSnippet = `export class TextField implements FormValueControl<string> {
  // Required — the control owns the value
  value = model<string>('');

  // Interaction — control writes, form reads
  touched = model(false);

  // Availability & validation — form writes, control reads
  disabled = input(false);
  readonly = input(false);
  invalid = input(false);
  errors = input<readonly ValidationError[]>([]);

  // Constraints — form writes, control reads
  required = input(false);
  maxLength = input<number | undefined>(undefined);
}`;

export function AdvancedControlSlide() {
  return (
    <ContentSlideFrame
      title="Wiring the optional signals"
      subhead="Opt into whatever your control needs. The form updates input signals; the control updates model signals."
    >
      <CodePanel code={advancedControlSnippet} language="typescript" />
    </ContentSlideFrame>
  );
}

// ---------- Slide 6: Before — ControlValueAccessor ----------

export function CvaBeforeSlide() {
  return (
    <DemoSlide
      title="Before — ControlValueAccessor"
      src="http://localhost:4200/custom-control-reactive"
      color={COLOR}
      tabs={[
        { label: "TS", code: cvaReactiveTs, language: "typescript" },
        { label: "HTML", code: cvaReactiveHtml, language: "html" },
        { label: "CSS", code: cvaReactiveCss, language: "css" },
      ]}
    />
  );
}

// ---------- Slide 7: After — FormValueControl ----------

export function FormValueControlAfterSlide() {
  return (
    <DemoSlide
      title="After — FormValueControl"
      src="http://localhost:4200/custom-control-signal"
      color={COLOR}
      tabs={[
        { label: "TS", code: fvcSignalTs, language: "typescript" },
        { label: "HTML", code: fvcSignalHtml, language: "html" },
        { label: "CSS", code: fvcSignalCss, language: "css" },
      ]}
    />
  );
}
