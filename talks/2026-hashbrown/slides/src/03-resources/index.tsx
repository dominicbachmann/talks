import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.resources;

export function ResourcesSectionOpener() {
  return <SectionOpener number="03" title="Resources" color={COLOR} />;
}

const resourcesRows: {
  resource: string;
  multi: boolean;
  single: boolean;
  schema: boolean;
  tools: boolean;
  ui: boolean;
}[] = [
  { resource: "chatResource", multi: true, single: false, schema: false, tools: true, ui: false },
  { resource: "completionResource", multi: false, single: true, schema: false, tools: false, ui: false },
  { resource: "structuredChatResource", multi: true, single: false, schema: true, tools: true, ui: false },
  { resource: "structuredCompletionResource", multi: false, single: true, schema: true, tools: true, ui: false },
  { resource: "uiChatResource", multi: true, single: false, schema: true, tools: true, ui: true },
];

export function ResourcesComparisonSlide() {
  const tick = (v: boolean) => (
    <span
      style={{
        color: v ? COLOR : "rgba(255,255,255,0.18)",
        fontSize: "1.1em",
      }}
    >
      {v ? "●" : "○"}
    </span>
  );
  return (
    <ContentSlide
      title="Choosing a Resource"
      subhead="All return Angular Resources — value(), isLoading(), status(), error()."
      color={COLOR}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.7em",
          color: BODY,
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: `2px solid ${COLOR}`,
              color: "#fff",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700 }}>Resource</th>
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700, textAlign: "center" }}>Multi</th>
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700, textAlign: "center" }}>Single</th>
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700, textAlign: "center" }}>Schema</th>
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700, textAlign: "center" }}>Tools</th>
            <th style={{ padding: "0.5em 0.4em", fontWeight: 700, textAlign: "center" }}>UI</th>
          </tr>
        </thead>
        <tbody>
          {resourcesRows.map((r) => (
            <tr
              key={r.resource}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <td style={{ padding: "0.5em 0.4em" }}>
                <code style={{ background: "transparent", color: COLOR }}>
                  {r.resource}
                </code>
              </td>
              <td style={{ padding: "0.5em 0.4em", textAlign: "center" }}>{tick(r.multi)}</td>
              <td style={{ padding: "0.5em 0.4em", textAlign: "center" }}>{tick(r.single)}</td>
              <td style={{ padding: "0.5em 0.4em", textAlign: "center" }}>{tick(r.schema)}</td>
              <td style={{ padding: "0.5em 0.4em", textAlign: "center" }}>{tick(r.tools)}</td>
              <td style={{ padding: "0.5em 0.4em", textAlign: "center" }}>{tick(r.ui)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentSlide>
  );
}

const chatResourceSnippet = `chat = chatResource({
  model: 'gpt-5',
  system: 'You are Reel. Suggest showtimes, never invent them.',
  messages: [
    { role: 'user', content: 'What should we see tonight?' },
  ],
});`;

const chatResourceTemplateSnippet = `@for (m of chat.value(); track $index) {
  <p>{{ m.content }}</p>
}`;

export function ChatResourceSlide() {
  return (
    <ContentSlide
      title="chatResource"
      subhead="The basic multi-turn chat."
      color={COLOR}
    >
      <div style={{ marginBottom: "0.8em" }}>
        <CodePanel code={chatResourceSnippet} fontSize="0.62em" />
      </div>
      <div
        style={{
          fontSize: "0.75em",
          color: MUTED,
          marginBottom: "0.4em",
        }}
      >
        Render
      </div>
      <CodePanel code={chatResourceTemplateSnippet} language="html" fontSize="0.62em" />
    </ContentSlide>
  );
}

const completionResourceSnippet = `movieQuery = signal('slow-burn sci-fi from the last 10 years');

recommendation = completionResource({
  model: 'gpt-4.1',
  input: this.movieQuery,
  system: 'Recommend a single movie title and one-line reason.',
});

// recommendation.value() → "Arrival — first-contact drama, no fluff."
// recommendation.isReceiving() → true | false`;

export function CompletionResourceSlide() {
  return (
    <ContentSlide
      title="completionResource"
      subhead="Single-turn: input in, output out. Reactive to signal input."
      color={COLOR}
    >
      <CodePanel code={completionResourceSnippet} fontSize="0.6em" />
    </ContentSlide>
  );
}

const structuredChatSnippet = `chat = structuredChatResource({
  system: \`Collect the booking party — date, party size,
and max per-seat budget.\`,
  schema: s.object('Booking party', {
    date: s.string('ISO date (YYYY-MM-DD)'),
    partySize: s.integer('Number of people'),
    maxPricePerSeat: s.number('Max per-seat price'),
  }),
});

// chat.value().content →
//   { date: '2026-05-03', partySize: 4, maxPricePerSeat: 15 }`;

export function StructuredChatResourceSlide() {
  return (
    <ContentSlide
      title="structuredChatResource"
      subhead="Multi-turn chat that returns typed data matching a Skillet schema."
      color={COLOR}
    >
      <CodePanel code={structuredChatSnippet} fontSize="0.6em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Great for conversational forms, wizards, or multi-turn data collection.
      </div>
    </ContentSlide>
  );
}

const structuredCompletionSnippet = `plannedNight = structuredCompletionResource({
  debugName: 'Plan Movie Night',
  system: 'Suggest 3–5 showtimes that fit the plan. Use only the provided theaters.',
  input: computed(() => this.plan() ? {
    plan: this.plan(),  // { date, budget, partySize, genres }
    availableTheaters: untracked(() =>
      this.theaters().map(t => ({ id: t.id, name: t.name })),
    ),
  } : null),
  schema: s.array('Showtimes', s.object('Showtime', {
    movieId: s.string('Movie ID'),
    startsAt: s.string('ISO 8601 start time'),
    format: s.enumeration('Format',
      ['2D', '3D', 'IMAX', 'Dolby']),
    pricePerSeat: s.number('Price per seat'),
    theaterId: s.string('One of the available theater IDs'),
  })),
});`;

export function StructuredCompletionResourceSlide() {
  return (
    <ContentSlide
      title="structuredCompletionResource"
      subhead="The 'predict from state' resource."
      color={COLOR}
    >
      <CodePanel code={structuredCompletionSnippet} fontSize="0.5em" />
      <div
        style={{
          marginTop: "0.6em",
          fontSize: "0.75em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Return <code>null</code> from <code>input</code> to skip a run.
      </div>
    </ContentSlide>
  );
}

const uiChatResourceSnippet = `chat = uiChatResource({
  components: [
    exposeComponent(MovieCardComponent, {
      description: 'Render a single movie as a card',
      input: {
        movieId: s.string('The movie ID'),
        title: s.streaming.string('The movie title'),
      },
    }),
  ],
});`;

export function UiChatResourceSlide() {
  return (
    <ContentSlide
      title="uiChatResource"
      subhead="The generative UI resource — responses carry a UI tree of your components."
      color={COLOR}
    >
      <CodePanel code={uiChatResourceSnippet} fontSize="0.6em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Covered in depth in the Generative UI section.
      </div>
    </ContentSlide>
  );
}
