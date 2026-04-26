import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { DemoSlide } from "../shared/DemoSlide";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";
import jsRuntimeTs from "../../../demos/src/app/js-runtime/js-runtime.component.ts?raw";
import jsRuntimeHtml from "../../../demos/src/app/js-runtime/js-runtime.component.html?raw";
import jsRuntimeCss from "../../../demos/src/app/js-runtime/js-runtime.component.css?raw";

const COLOR = SECTION_COLORS.jsRuntime;

export function JsRuntimeSectionOpener() {
  return <SectionOpener number="08" title="JavaScript Runtime" color={COLOR} />;
}

export function WhyRuntimeSlide() {
  return (
    <BulletSlide
      title="Why a Runtime?"
      subhead="LLMs are bad at math, orchestration, and deterministic multi-step logic."
      color={COLOR}
      bullets={[
        "Data transformation and orchestration",
        "Charts and visualizations",
        "Sequences of tasks",
        "Grounding math to reduce hallucinations",
      ]}
    />
  );
}

const howItWorksSteps: React.ReactNode[] = [
  <>
    <b>QuickJS</b> compiled to WebAssembly — a safe browser sandbox
  </>,
  <>
    Register functions with <code>createRuntimeFunction()</code>
  </>,
  <>
    Hashbrown generates TypeScript definitions and feeds them to the model
  </>,
  <>
    The model <b>writes a full script</b> that calls your functions
  </>,
  <>
    Wrap with <code>createToolJavaScript({"{ runtime }"})</code> — one tool for the LLM
  </>,
];

export function HowRuntimeWorksSlide() {
  return (
    <ContentSlide
      title="How It Works"
      subhead="The LLM authors JavaScript; the sandbox runs it next to your app."
      color={COLOR}
    >
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {howItWorksSteps.map((step, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.95em",
              color: BODY,
              padding: "0.35em 0",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.8em",
            }}
          >
            <span
              style={{
                fontSize: "0.8em",
                fontWeight: 700,
                color: COLOR,
                minWidth: "1.5em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ lineHeight: 1.5 }}>{step}</span>
          </li>
        ))}
      </ol>
    </ContentSlide>
  );
}

const createRuntimeSnippet = `import { createRuntime } from '@hashbrownai/angular';

runtime = createRuntime({
  functions: [],
});`;

export function CreateRuntimeSlide() {
  return (
    <ContentSlide
      title="createRuntime()"
      subhead="Declare the sandbox and the functions it exposes."
      color={COLOR}
    >
      <CodePanel code={createRuntimeSnippet} fontSize="0.62em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Always pass an <code>AbortSignal</code> when running scripts —{" "}
        <code>AbortSignal.timeout()</code> is the recommended pattern.
      </div>
    </ContentSlide>
  );
}

const createRuntimeFunctionSnippet = `createRuntimeFunction({
  name: 'getShowtimes',
  description: 'Get showtimes for a date',
  args: s.object('Showtime query', {
    date: s.string('ISO date (YYYY-MM-DD)'),
  }),
  result: s.array('Showtimes', s.object('Showtime', {
    id: s.string('Showtime ID'),
    movieId: s.string('Movie ID'),
    startsAt: s.string('ISO 8601 start time'),
    format: s.enumeration('Format',
      ['2D', '3D', 'IMAX', 'Dolby']),
    pricePerSeat: s.number('Price per seat'),
  })),
  handler: async (input) =>
    this.showtimesService.load(input.date),
}),`;

export function CreateRuntimeFunctionSlide() {
  return (
    <ContentSlide
      title="createRuntimeFunction()"
      subhead="args + result schemas auto-generate the types the model sees."
      color={COLOR}
    >
      <CodePanel code={createRuntimeFunctionSnippet} fontSize="0.44em" />
    </ContentSlide>
  );
}

const createToolJavaScriptSnippet = `import { createToolJavaScript } from '@hashbrownai/angular';

chat = uiChatResource({
  tools: [
    createToolJavaScript({ runtime }),
  ],
});`;

export function CreateToolJavaScriptSlide() {
  return (
    <ContentSlide
      title="createToolJavaScript()"
      subhead="Plug the runtime into any resource."
      color={COLOR}
    >
      <CodePanel code={createToolJavaScriptSnippet} fontSize="0.62em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        The model sees <b>one</b> tool: "run JavaScript" — plus the TypeScript
        types for all your runtime functions. It authors whole scripts
        (loops, conditionals, math) instead of one tool call per step.
      </div>
    </ContentSlide>
  );
}

export function JsRuntimeDemoSlide() {
  return (
    <DemoSlide
      title="Demo — JavaScript Runtime"
      src="http://localhost:4200/js-runtime"
      color={COLOR}
      tabs={[
        { label: "TS", code: jsRuntimeTs, language: "typescript" },
        { label: "HTML", code: jsRuntimeHtml, language: "html" },
        { label: "CSS", code: jsRuntimeCss, language: "css" },
      ]}
    />
  );
}
