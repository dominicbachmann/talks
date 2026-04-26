import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { DemoSlide } from "../shared/DemoSlide";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";
import toolCallingTs from "../../../demos/src/app/tool-calling/tool-calling.component.ts?raw";
import toolCallingHtml from "../../../demos/src/app/tool-calling/tool-calling.component.html?raw";
import toolCallingCss from "../../../demos/src/app/tool-calling/tool-calling.component.css?raw";

const COLOR = SECTION_COLORS.toolCalling;

export function ToolCallingSectionOpener() {
  return <SectionOpener number="06" title="Tool Calling" color={COLOR} />;
}

export function WhyToolsSlide() {
  return (
    <BulletSlide
      title="Why Tools?"
      subhead="Give the model access to app state and let it take actions."
      color={COLOR}
      bullets={[
        "Expose application state to the model",
        "Let the model take actions",
        "Offer intelligent next actions",
        "Automate repetitive user tasks",
      ]}
    />
  );
}

const howItWorksSteps = [
  <>
    Define tools with <code>createTool()</code>
  </>,
  <>
    Pass them into any resource via <code>tools: [...]</code>
  </>,
  "Model decides whether to call a tool",
  "Hashbrown runs the handler in Angular's injection context",
  "Result is sent back to the model — the turn continues",
];

export function HowItWorksSlide() {
  return (
    <ContentSlide
      title="How It Works"
      subhead="Handlers run inside Angular's injection context — inject() just works."
      color={COLOR}
    >
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          counterReset: "step",
        }}
      >
        {howItWorksSteps.map((step, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.9em",
              color: BODY,
              padding: "0.25em 0",
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

const createToolSnippet = `import { createTool } from '@hashbrownai/angular';

createTool({
  name: 'getShowtimes',
  description: 'Get showtimes for a date',
  schema: s.object('Showtime query', {
    date: s.string('ISO date (YYYY-MM-DD)'),
  }),
  handler: async (input) => {
    const store = inject(ShowtimesStore);
    return store.query(input);
  },
});`;

export function CreateToolSlide() {
  return (
    <ContentSlide title="createTool()" color={COLOR}>
      <CodePanel code={createToolSnippet} fontSize="0.6em" />
    </ContentSlide>
  );
}

const providingToolsSnippet = `@Component({ providers: [ShowtimesStore] })
export class ChatComponent {
  showtimesStore = inject(ShowtimesStore);

  chat = chatResource({
    tools: [
      createTool({
        name: 'getCurrentUser',
        description: 'Get the current user',
        handler: () => inject(AuthService).getUser(),
      }),
      createTool({
        name: 'getShowtimes',
        description: 'Get showtimes for a date, with optional filters',
        schema: s.object('Showtime query', {
          date: s.string('ISO date (YYYY-MM-DD)'),
          genre: s.anyOf([s.string('Genre filter'), s.nullish()]),
        }),
        handler: async (input) => this.showtimesStore.query(input),
      }),
      createTool({
        name: 'bookSeats',
        description: 'Book seats for a showtime',
        schema: s.object('Booking input', {
          showtimeId: s.string('The showtime ID'),
          seatIds: s.array('Seat IDs', s.string('Seat ID')),
        }),
        handler: async (input) => this.showtimesStore.book(input),
      }),
    ],
  });
}`;

export function ProvidingToolsSlide() {
  return (
    <ContentSlide
      title="Providing Tools"
      subhead="Three patterns: read state, invoke a service, mutate state."
      color={COLOR}
    >
      <CodePanel code={providingToolsSnippet} fontSize="0.44em" />
      <div
        style={{
          marginTop: "0.5em",
          fontSize: "0.75em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Drop the array into any resource's <code>tools</code> option.
      </div>
    </ContentSlide>
  );
}

export function ToolCallingDemoSlide() {
  return (
    <DemoSlide
      title="Demo — Tool Calling"
      src="http://localhost:4200/tool-calling"
      color={COLOR}
      tabs={[
        { label: "TS", code: toolCallingTs, language: "typescript" },
        { label: "HTML", code: toolCallingHtml, language: "html" },
        { label: "CSS", code: toolCallingCss, language: "css" },
      ]}
    />
  );
}
