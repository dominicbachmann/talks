import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.aiBasics;

export function AiBasicsSectionOpener() {
  return <SectionOpener number="02" title="AI Basics" color={COLOR} />;
}

const messageSnippet = `interface UserMessage {
  role: 'user';
  content: string | JsonValue;
}
interface AssistantMessage<Output, Tools> {
  role: 'assistant';
  content?: Output;
  toolCalls: ToolCall<Tools>[];
}
interface ErrorMessage {
  role: 'error';
  content: string;
}`;

export function MessageSlide() {
  return (
    <ContentSlide
      title="What is a Message?"
      subhead="One unit of conversation — three interfaces."
      color={COLOR}
    >
      <CodePanel code={messageSnippet} />
    </ContentSlide>
  );
}

const roles: { role: string; sender: string; purpose: string }[] = [
  { role: "user", sender: "Human / UI", purpose: "Ask, command" },
  { role: "assistant", sender: "LLM", purpose: "Answer, call a tool" },
  { role: "error", sender: "Hashbrown / your code", purpose: "Report a failure" },
];

export function MessageRolesSlide() {
  return (
    <ContentSlide title="Message Roles" color={COLOR}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9em",
          color: BODY,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: `2px solid ${COLOR}`,
              textAlign: "left",
              color: "#fff",
            }}
          >
            <th style={{ padding: "0.6em 0.8em", fontWeight: 700 }}>Role</th>
            <th style={{ padding: "0.6em 0.8em", fontWeight: 700 }}>Sender</th>
            <th style={{ padding: "0.6em 0.8em", fontWeight: 700 }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((r) => (
            <tr
              key={r.role}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <td style={{ padding: "0.5em 0.8em" }}>
                <code style={{ background: "transparent", color: COLOR }}>
                  {r.role}
                </code>
              </td>
              <td style={{ padding: "0.5em 0.8em" }}>{r.sender}</td>
              <td style={{ padding: "0.5em 0.8em" }}>{r.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentSlide>
  );
}

const turnSnippet = `{ role: 'user',
  content: 'Book two aisle seats for the 9pm showing of MOV-142' }
{ role: 'assistant', toolCalls: [
  { name: 'getShowtime',
    args: { movieId: 'MOV-142', startsAfter: '20:30' } }
] }
{ role: 'assistant', toolCalls: [
  { name: 'bookSeats',
    args: { showtimeId: 'SHOW-91', seatIds: ['A12', 'A13'] } }
] }
{ role: 'assistant',
  content: 'Booked A12 and A13 for the 9:15pm showing.' }`;

export function AssistantTurnSlide() {
  return (
    <ContentSlide
      title="The Assistant Turn"
      subhead="A turn = every step until the assistant emits final content without tool calls."
      color={COLOR}
    >
      <CodePanel code={turnSnippet} fontSize="0.6em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Hashbrown wires it all up — you consume <code>messages</code> as one
        ordered array.
      </div>
    </ContentSlide>
  );
}

const singleTurnSnippet = `movieQuery = signal('slow-burn sci-fi from the last 10 years');

recommendation = completionResource({
  model: 'gpt-4.1',
  input: this.movieQuery,
  system: 'Recommend a single movie title and one-line reason.',
  tools: [getSimilarMoviesTool],
});`;

const multiTurnSnippet = `chat = chatResource({
  model: 'gpt-4.1',
  system: 'You are Reel, a cinema concierge.',
});

this.chat.sendMessage({
  role: 'user',
  content: 'What should we see tonight?',
});`;

export function CompletionSlide() {
  return (
    <ContentSlide
      title="What is a Completion?"
      subhead="Single-turn — input in, output out. Multi-turn — stateful conversation."
      color={COLOR}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1em",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.85em",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "0.4em",
            }}
          >
            Single-turn · <code>completionResource</code>
          </div>
          <CodePanel code={singleTurnSnippet} fontSize="0.58em" />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.85em",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "0.4em",
            }}
          >
            Multi-turn · <code>chatResource</code>
          </div>
          <CodePanel code={multiTurnSnippet} fontSize="0.58em" />
        </div>
      </div>
    </ContentSlide>
  );
}

const errorSnippet = `{ role: 'error', content: '500: Internal Server Error' }`;

export function ErrorMessagesSlide() {
  return (
    <ContentSlide
      title="Error Messages"
      subhead="Failures are messages, not thrown exceptions."
      color={COLOR}
    >
      <CodePanel code={errorSnippet} />
      <ul
        style={{
          fontSize: "0.85em",
          color: BODY,
          lineHeight: 1.6,
          margin: "1em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li>
          Call <code>retry()</code> on the resource to re-run the completion
        </li>
        <li>
          Errors appear in <code>messages()</code> — easy to render inline
        </li>
      </ul>
    </ContentSlide>
  );
}

export function AiBasicsRecapSlide() {
  return (
    <BulletSlide
      title="Section Recap"
      subhead="Three concepts you'll see in every Hashbrown API."
      color={COLOR}
      bullets={[
        <>
          <b>Message</b> — one unit of conversation (<code>user</code> /{" "}
          <code>assistant</code> / <code>error</code>)
        </>,
        <>
          <b>Turn</b> — every step the assistant takes until it emits final
          content
        </>,
        <>
          <b>Completion</b> — the assistant's payload; single-turn or multi-turn
        </>,
      ]}
    />
  );
}
