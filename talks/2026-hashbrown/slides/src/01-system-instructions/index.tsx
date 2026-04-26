import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.systemInstructions;

export function SystemInstructionsSectionOpener() {
  return <SectionOpener number="01" title="System Instructions" color={COLOR} />;
}

export function WhySystemInstructionsSlide() {
  return (
    <BulletSlide
      title="Why System Instructions"
      subhead="The initial, system-level guidance that shapes every assistant response."
      color={COLOR}
      bullets={[
        "The initial, system-level guidance sent with every request",
        <>Sets <b>role</b>, <b>tone</b>, <b>rules</b>, and <b>examples</b></>,
        <>Aligns the model with product goals <i>before</i> any user input arrives</>,
      ]}
    />
  );
}

const fourPartsCss = `
.prompt-layer {
  font-size: 0.8em;
  font-weight: 600;
  padding: 0.45em 1em;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  text-align: center;
  color: oklch(85% .01 0);
  transition: all 0.3s ease;
}
.prompt-arrow {
  text-align: center;
  font-size: 1em;
  color: ${COLOR};
  opacity: 0.5;
  line-height: 1;
  margin: 0.02em 0;
}
`;

export function AuthoringFourPartsSlide() {
  const layers = ["Role / Tone", "Rules", "Examples", "User Input"];
  return (
    <ContentSlide
      title="The Four Parts"
      subhead="Order matters — position affects how the model interprets each section."
      color={COLOR}
    >
      <style>{fourPartsCss}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.1em",
          width: "60%",
          margin: "0 auto",
        }}
      >
        {layers.map((layer, i) => (
          <div key={layer}>
            <div
              className="prompt-layer"
              style={{
                borderLeft: `3px solid ${COLOR}`,
                opacity: 1 - i * 0.15,
              }}
            >
              {layer}
            </div>
            {i < layers.length - 1 && (
              <div className="prompt-arrow">↓</div>
            )}
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

export function StructuringPromptSlide() {
  const dos = [
    <>Organize logically: <code>role → rules → examples → user input</code></>,
    <>Use clear delimiters (<code>###</code>, <code>"""</code>)</>,
    <>Keep formatting clean and consistent</>,
  ];
  const donts = [
    "Jam everything into one blob",
    "Mix metadata and examples without boundaries",
    "Rely on prose when a list will do",
  ];
  return (
    <ContentSlide
      title="Structuring the Prompt"
      subhead="Layout shapes interpretation — give the model visual hooks."
      color={COLOR}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2em",
          width: "100%",
        }}
      >
        <DoList title="Do" tone="good" items={dos} />
        <DoList title="Don't" tone="bad" items={donts} />
      </div>
    </ContentSlide>
  );
}

function DoList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "good" | "bad";
  items: React.ReactNode[];
}) {
  const color = tone === "good" ? "#3fb950" : "#f85149";
  return (
    <div>
      <div
        style={{
          fontSize: "1em",
          fontWeight: 700,
          color,
          marginBottom: "0.6em",
        }}
      >
        {title}
      </div>
      <ul
        style={{
          fontSize: "0.85em",
          color: BODY,
          lineHeight: 1.6,
          margin: 0,
          paddingLeft: "1.2em",
        }}
      >
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: "0.4em" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const roleToneSnippet = `### ROLE & TONE
You are **Reel**, a cinema concierge that helps users
find showtimes and book seats.
— Voice: warm, curious, low-key enthusiastic
— Audience: moviegoers browsing for something to watch
  tonight
— Attitude: helpful, opinionated when asked, never pushy`;

export function RoleToneSlide() {
  return (
    <ContentSlide
      title="Role & Tone"
      subhead="First section: who is the assistant and how does it speak?"
      color={COLOR}
    >
      <CodePanel code={roleToneSnippet} language="markdown" />
      <div
        style={{
          marginTop: "1em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Avoid vague roles, conflicting traits ("formal and chill"), or
        overloaded responsibilities.
      </div>
    </ContentSlide>
  );
}

const rulesSnippet = `### RULES
1. **Always** reference movies by their ID (e.g. \`MOV-142\`)
   when suggesting actions.
2. **Never** book seats without confirming with the user
   first.
3. If uncertain, **admit it** and ask a clarifying question;
   do not invent showtimes.
4. For anything outside movies and cinemas: respond
   "That's outside what I do."`;

export function RulesSlide() {
  return (
    <ContentSlide
      title="Setting Rules"
      subhead="Directive language works"
      color={COLOR}
    >
      <CodePanel code={rulesSnippet} language="markdown" />
      <ul
        style={{
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
          margin: "0.8em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li>
          Use <b>always</b>, <b>never</b>, <b>important</b>
        </li>
        <li>Say what to do <i>and</i> what to avoid</li>
      </ul>
    </ContentSlide>
  );
}

const examplesSnippet = `#### Positive
User: "What's playing tonight in IMAX?"
Assistant: "Three IMAX showings tonight: MOV-142 at 7:15pm,
MOV-178 at 8:30pm, MOV-091 at 10:00pm. Want details?"

#### Refusal
User: "Rewrite my résumé for me."
Assistant: "That's outside what I do."

#### Clarification
User: "Book two seats."
Assistant: "Which showing? Tonight I have MOV-142 at
7:15pm, MOV-178 at 8:30pm, MOV-091 at 10:00pm."

#### Tool call
User: "Who am I signed in as?"
Assistant:
[tool_call] getCurrentUser()
[tool_call_result] { "name": "Dominic", "memberTier": "gold" }
"You're signed in as Dominic (gold member)."`;

export function ExamplesSlide() {
  return (
    <ContentSlide
      title="Writing Clear Examples"
      subhead="2–4 pairs usually enough. Cover positive, refusal, clarification, tool call."
      color={COLOR}
    >
      <CodePanel code={examplesSnippet} language="markdown" fontSize="0.55em" />
    </ContentSlide>
  );
}

const userInputBad = `completionResource({
  system: \`The user's watchlist:
    \${watchlist().map(m => m.title).join(', ')}\`,
  input: searchQuery,
});`;

const userInputGood = `completionResource({
  system: \`Recommend 3 movies similar
to the search query.\`,
  input: computed(() => ({
    query: searchQuery(),
    watchlist: watchlist().map(m => ({
      id: m.id,
      title: m.title,
      genres: m.genres,
    })),
  })),
});`;

export function ManagingUserInputSlide() {
  return (
    <ContentSlide
      title="Managing User Input"
      subhead="Never concatenate user input into the system prompt — it's a prompt-injection vector."
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
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#f85149",
              marginBottom: "0.4em",
            }}
          >
            ✗ Don't
          </div>
          <CodePanel code={userInputBad} fontSize="0.6em" />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#3fb950",
              marginBottom: "0.4em",
            }}
          >
            ✓ Do
          </div>
          <CodePanel code={userInputGood} fontSize="0.6em" />
        </div>
      </div>
    </ContentSlide>
  );
}

export function ClientVsServerSlide() {
  return (
    <BulletSlide
      title="Client vs Server Instructions"
      subhead="Hashbrown moves the LLM to the frontend — so where should the prompt live?"
      color={COLOR}
      bullets={[
        "Security still lives at your API layer — not in the prompt",
        "Client-side is fine for most features (transparency can be a feature)",
        "Server-side when the prompt contains proprietary techniques or sensitive context",
      ]}
    />
  );
}

export function SecuritySlide() {
  return (
    <BulletSlide
      title="Security of System Instructions"
      subhead="Assume everything is visible."
      color={COLOR}
      bullets={[
        "Frontend code is never truly private — treat the prompt as public",
        <><b>Never</b> use the system instruction for authorization</>,
        "Even server-side, skilled users can extract the prompt — keep secrets out",
      ]}
    />
  );
}
