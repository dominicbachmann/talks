# Hashbrown Tech Talk — Detailed Overview

> Source: https://hashbrown.dev (Angular docs). All code snippets use the Angular package `@hashbrownai/angular`.

---

## Intro

### Title Slide
- **Hashbrown** — The TypeScript Framework for Generative UI
- "Agents that run in the browser"
- Speaker name / role / date

### Agents that run in the browser
- Most AI SDKs stop at the server. Hashbrown moves tool calling, structured data, and component generation into the browser — next to your services, state, and components.
- Three things Hashbrown is built to do:
  1. **Generative UI** — LLMs compose real views from your components and stream them into the page.
  2. **Natural language → structured data** — strongly-typed outputs via Skillet.
  3. **Tool calling** - define functions that agent can run
- Key properties: headless, signal-based, platform-agnostic (OpenAI, Azure, Anthropic, Bedrock, Gemini, Writer, Ollama), streaming-first.

### Table of Contents
- System instructions
- AI basics: roles, turns, completions
- Hashbrown resources
- Skillet schema language
- Streaming
- Tool calling
- Generative UI
- JavaScript runtime
- Q&A

---

## System Instructions

### Why system instructions matter (intro slide)
- The initial, system-level guidance sent with every request.
- Sets **role, tone, rules, examples** — every assistant message considers it.
- Where you align the model with your product goals *before* any user input arrives.

### Authoring System Instructions — the four parts
Show a layered diagram: `role/tone → rules → examples → user input`

- Structure matters — position affects model behavior
- Use clear delimiters (`###`, `"""`) to separate sections
- Keep formatting clean and consistent

#### Structuring the Prompt
- ✅ Organize logically: `role → rules → examples → user input`
- ✅ Use delimiters (`###`, `"""`)
- ❌ Don't jam everything into one blob
- ❌ Don't mix metadata and examples without boundaries

#### Setting the Role & Tone
- First section: who is the assistant and how does it speak?
- Live example:
  ```markdown
  ### ROLE & TONE
  You are **Reel**, a cinema concierge that helps users find showtimes and book seats.
  — Voice: warm, curious, low-key enthusiastic
  — Audience: moviegoers browsing for something to watch tonight
  — Attitude: helpful, opinionated when asked, never pushy
  ```
- ❌ Vague roles, conflicting traits ("formal and chill"), overloaded responsibilities

#### Setting Rules
- Use strong, directive language: **always**, **never**, **important**
- Define both what to do *and* what to avoid
- **Don't threaten the LLM** — it doesn't improve rule-following
- Example:
  ```markdown
  ### RULES
  1. **Always** reference movies by their ID (e.g. `MOV-142`) when suggesting actions.
  2. **Never** book seats without confirming with the user first.
  3. If uncertain, **admit it** and ask a clarifying question; do not invent showtimes.
  4. For anything outside movies and cinemas: respond "That's outside what I do."
  ```

#### Writing Clear Examples (few-shot prompting)
- 2–4 well-chosen input/output pairs usually enough (for models like GPT-4.1)
- Include **positive**, **refusal**, **clarification**, and **tool-calling** examples
- Show the example block:
  ```markdown
  #### Positive example
  User: "What's playing tonight in IMAX?"
  Assistant: "Three IMAX showings tonight: MOV-142 at 7:15pm,
  MOV-178 at 8:30pm, MOV-091 at 10:00pm. Want details on any of them?"

  #### Refusal example
  User: "Rewrite my résumé for me."
  Assistant: "That's outside what I do."

  #### Clarification example
  User: "Book two seats."
  Assistant: "Which showing? Tonight I have MOV-142 at 7:15pm,
  MOV-178 at 8:30pm, and MOV-091 at 10:00pm."

  #### Tool-call example
  User: "Who am I signed in as?"
  Assistant:
  [tool_call] getCurrentUser()
  [tool_call_result] { "name": "Dominic", "memberTier": "gold" }
  "You're signed in as Dominic (gold member)."
  ```

#### Managing User Input
- **Never concatenate user input into the system instruction** — prompt injection risk.
- Pass user input as `input` or as `role: 'user'` messages.
- ❌ BAD:
  ```ts
  completionResource({
    system: `The user's watchlist: ${watchlist().map(m => m.title).join(', ')}`,
    input: searchQuery,
  });
  ```
- ✅ GOOD:
  ```ts
  completionResource({
    system: `Recommend 3 movies similar to the search query.`,
    input: computed(() => ({
      query: searchQuery(),
      watchlist: watchlist().map(m => ({ id: m.id, title: m.title, genres: m.genres })),
    })),
  });
  ```
- If unavoidable: escape and wrap in clear delimiters.

#### Demo: Prompt without vs with System Instructions
- Same user question, two models side-by-side:
  - Left: no system instruction, default GPT style
  - Right: full ROLE/RULES/EXAMPLES system instruction
- Talk through tone drift, format drift, compliance with rules

---

### Client-side vs Server-side System Instructions

#### Where should the instruction live?
- Hashbrown moves the LLM to the frontend — security controls are still at the API layer.
- Client-side instructions are fine for many features (transparency is often a feature).
- Server-side when the instruction contains proprietary prompting techniques or sensitive context.

#### Security of System Instructions
- Frontend code is never truly private — assume everything is visible.
- **Never use the system instruction for authorization or security.**
- Even server-side, assume a skilled user can extract the prompt — don't put secrets there.

---

## Hashbrown AI Basics: Roles, Turns & Completions

### What is a message?
- A message = one unit of conversation.
- Three interfaces: `UserMessage`, `AssistantMessage`, `ErrorMessage`.
  ```ts
  interface UserMessage {
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
  }
  ```

### Message roles
| Role | Sender | Purpose |
|------|--------|---------|
| **user** | Human / UI | Ask, command |
| **assistant** | LLM | Answer, call a tool |
| **error** | Hashbrown / your code | Report a failure |

Example sequence:
```ts
{ role: 'user', content: 'Book two aisle seats for the 9pm showing of MOV-142' }
{ role: 'assistant', toolCalls: [{ name: 'getShowtime', args: { movieId: 'MOV-142', startsAfter: '20:30' }, status: 'pending' }] }
{ role: 'assistant', toolCalls: [{ name: 'bookSeats', args: { showtimeId: 'SHOW-91', seatIds: ['A12', 'A13'] }, status: 'pending' }] }
{ role: 'assistant', content: 'Booked A12 and A13 for the 9:15pm showing. Confirmation will hit your inbox.' }
```

### The assistant turn
- A **turn** = the whole chain until the assistant emits content without `toolCalls`.
- Hashbrown wires it all up — you consume `messages` as a single ordered array.

### What is a completion?
- Two flavours:
  - **Single-turn**: `completionResource` — input in, output out.
  - **Multi-turn**: `chatResource` — stateful conversation history.
- Single-turn example:
  ```ts
  movieQuery = signal('slow-burn sci-fi from the last 10 years');
  recommendation = completionResource({
    model: 'gpt-4.1',
    input: this.movieQuery,
    system: 'Recommend a single movie title and one-line reason.',
    tools: [getSimilarMoviesTool],
  });
  ```
- Multi-turn example:
  ```ts
  chat = chatResource({
    model: 'gpt-4.1',
    system: 'You are Reel, a cinema concierge.',
  });
  // later: this.chat.sendMessage({ role: 'user', content: 'What should we see tonight?' });
  ```

### Error messages
- Failure becomes a message, not a thrown exception:
  ```ts
  { role: 'error', content: '500: Internal Server Error' }
  ```
- Call `retry()` from the resource to re-run the completion.
- Error shows up in `messages()` — easy to render inline.

### Quick cheat-sheet
```text
Message     = { role, content | toolCalls }
Roles       = user | assistant | error
Turn        = everything the assistant does until final content
Completion  = the assistant's response payload
              single-turn → completionResource
              multi-turn  → chatResource
```

---

## Hashbrown Resources

### Overview — choosing a resource
| Resource                          | Multi-turn | Single-turn | Schema | Tools | UI |
| --------------------------------- | :--------: | :---------: | :----: | :---: | :-: |
| `chatResource`                    | ✅ | ❌ | ❌ | ✅ | ❌ |
| `completionResource`              | ❌ | ✅ | ❌ | ❌ | ❌ |
| `structuredChatResource`          | ✅ | ❌ | ✅ | ✅ | ❌ |
| `structuredCompletionResource`    | ❌ | ✅ | ✅ | ✅ | ❌ |
| `uiChatResource`                  | ✅ | ❌ | ✅ | ✅ | ✅ |

Key talking point: all return Angular `Resource`s — you get `value()`, `isLoading()`, `status()`, `error()`, `hasValue()` for free.

### `chatResource`
- The basic multi-turn chat.
- Example:
  ```ts
  chat = chatResource({
    model: 'gpt-5',
    system: 'You are Reel. Suggest showtimes, never invent them.',
    messages: [{ role: 'user', content: 'What should we see tonight?' }],
  });
  ```
- Returns `ChatResourceRef`:
  - `value(): Signal<Chat.Message[]>`
  - `lastAssistantMessage(): Signal<AssistantMessage | undefined>`
  - `sendMessage(msg)`, `stop(clear?)`, `reload()`, `error()`, `isLoading()`
- Render:
  ```html
  @for (m of chat.value(); track $index) {
    <p>{{ m.content }}</p>
  }
  ```

### `completionResource`
- Single-turn: "input in, output out".
- Reactive — bind to a signal as `input`, re-runs automatically.
- Example:
  ```ts
  movieQuery = signal('slow-burn sci-fi from the last 10 years');
  recommendation = completionResource({
    model: 'gpt-4.1',
    input: this.movieQuery,
    system: 'Recommend a single movie title and one-line reason.',
    tools: [getSimilarMoviesTool],
  });
  ```
- Read: `recommendation.value()`, `recommendation.isReceiving()`.

### `structuredChatResource`
- Multi-turn chat that returns data matching a Skillet schema.
- Example:
  ```ts
  chat = structuredChatResource({
    system: `Collect the booking party — date, party size, and max per-seat budget.`,
    schema: s.object('Booking party', {
      date: s.string('ISO date (YYYY-MM-DD)'),
      partySize: s.integer('Number of people'),
      maxPricePerSeat: s.number('Max per-seat price'),
    }),
  });
  // chat.value().content → { date: '2026-05-03', partySize: 4, maxPricePerSeat: 15 }
  ```
- Great for conversational forms, wizards, or multi-turn data collection.

### `structuredCompletionResource`
- Single-turn + schema + reactive `input` signal.
- Canonical "predict something from app state" resource.
- Example (plan a movie night from a user brief):
  ```ts
  plannedNight = structuredCompletionResource({
    debugName: 'Plan Movie Night',
    system: `Suggest 3–5 showtimes that fit the plan. Use only the provided theaters.`,
    input: computed(() => this.plan() ? {
      plan: this.plan(),  // { date, budget, partySize, genres }
      availableTheaters: untracked(() =>
        this.theaters().map(t => ({ id: t.id, name: t.name })),
      ),
    } : null),
    schema: s.array('Showtimes', s.object('Showtime', {
      movieId: s.string('Movie ID'),
      startsAt: s.string('ISO 8601 start time'),
      format: s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
      pricePerSeat: s.number('Price per seat'),
      theaterId: s.string('One of the available theater IDs'),
    })),
  });
  ```
- Note: return `null` from `input` to skip a run.

### `uiChatResource`
- The Generative UI resource — returns messages whose content can include a UI tree of *your* components.
- Requires `components: ExposedComponent[]`.
- Example:
  ```ts
  chat = uiChatResource({
    components: [
      exposeComponent(MovieCardComponent, {
        description: 'Render a single movie as a card',
        input: {
          movieId: s.string('The movie ID'),
          title: s.streaming.string('The movie title'),
        },
      }),
    ],
  });
  ```
- Covered in depth in the Generative UI section.

---

## Hashbrown Skillet Schema

### What is Skillet?
- Zod-like schema language, **LLM-optimized**.
- Four principles:
  1. Strongly typed
  2. Purposefully limited to what LLMs support
  3. Optimized for LLM processing (descriptions are part of the schema)
  4. Streaming baked in
- Used for: structured outputs, tool arguments, component inputs.

### Primitives
```ts
s.string("The user's full name");
s.number("The user's age in years");  // floating-point
s.integer('The number of items in the cart');  // int only
s.boolean('Whether the user account is active');
s.literal('success');
```
- **Every primitive takes a description** — the model uses it to understand intent.
- No `minimum` / `maximum` on numbers (LLM limitation).

### Compound values
```ts
s.object('A user profile', {
  name: s.string("The user's name"),
  age: s.number("The user's age"),
  active: s.boolean('Whether active'),
});

s.array('A list of users', s.object('A user', {
  name: s.string('Name'),
  email: s.string('Email'),
}));
```

### AnyOf
- For discriminated unions — model picks one shape.
```ts
s.anyOf([
  s.object('Success response', {
    status: s.literal('success'),
    data: s.string('The response data'),
  }),
  s.object('Error response', {
    status: s.literal('error'),
    message: s.string('The error message'),
  }),
]);
```

### Enum
```ts
s.enumeration('Task priority', ['low', 'medium', 'high', 'urgent']);
```

### Nullish (and type inference) — the rest
- `s.nullish()` — usually paired with `anyOf`:
  ```ts
  s.anyOf([s.string('A string value'), s.nullish()]);
  ```
- Type inference with `s.Infer<typeof schema>`:
  ```ts
  const schema = s.object('Result', { code: s.string('JS code') });
  type Result = s.Infer<typeof schema>; // { code: string }
  ```
- Point out: full API lives at `hashbrown.dev/api/core/s`.

### Streaming
- "We saved the best bite for last."
- Add `streaming` to any compound/string to enable eager partial parsing:
  ```ts
  s.streaming.string();
  s.streaming.object();
  s.streaming.array();
  ```
- Skillet eagerly parses fragments as they arrive — no custom parser code.
- Mix streaming and non-streaming: stream the array, but *not* each object, when you need a complete shape per item.

---

## Hashbrown Streaming

### Streaming responses
- "Applications leveraging LLMs offer the best UX by streaming responses as fast as the LLM can generate them."
- Skillet + Angular signals = automatic: as chunks arrive, `value()` updates, Angular re-renders.
- Example schema (stream an array of showtime suggestions):
  ```ts
  plannedNight = structuredCompletionResource({
    input: this.plan,
    system: computed(() => `Suggest showtimes that fit the plan.\nTheaters:\n${
      this.theaters().map(t => `${t.id}: ${t.name}`).join('\n')
    }`),
    schema: s.object('Your response', {
      showtimes: s.streaming.array('Showtimes', s.object('Showtime', {
        movieId: s.string('Movie ID'),
        startsAt: s.string('ISO 8601 start time'),
        pricePerSeat: s.number('Price per seat'),
        theaterId: s.string('Theater ID'),
      })),
    }),
  });
  ```
- The outer array is `streaming`, but individual objects are complete — no half-objects reach the UI.

### Consuming the stream in the template
- One-line change in Angular — iterate the signal:
  ```html
  @for (s of plannedNight.value()?.showtimes ?? []; track s.movieId) {
    <app-showtime-suggestion
      [movieId]="s.movieId"
      [startsAt]="s.startsAt"
      [pricePerSeat]="s.pricePerSeat"
      [theaterId]="s.theaterId"
    />
  }
  ```
- Each new array item that parses cleanly triggers a re-render — "no magic, just signals."

### Demo
- Show the movie-night form: user fills in date, party size, budget → live list of showtime cards streams in.
- Call out `.value()` updating incrementally in DevTools.

---

## Hashbrown Tool Calling

### Why tools?
- Give the model access to application state *and* let it take actions.
- Four use cases:
  1. Expose app state to the model
  2. Let the model take actions
  3. Offer intelligent next actions
  4. Automate repetitive user tasks
- Hashbrown's twist: **handlers run inside Angular's injection context** — `inject()` just works.

### How it works
1. Define tools with `createTool()`
2. Pass them into any resource via `tools: [...]`
3. Model receives the user message, decides whether to call tools
4. Hashbrown executes the handler in Angular's injection context
5. Result is sent back to the model, which continues the turn

### `createTool()` Function
```ts
import { createTool } from '@hashbrownai/angular';

createTool({
  name: 'getUser',
  description: 'Get information about the current user',
  handler: (): Promise<User> => {
    const authService = inject(AuthService);
    return authService.getUser();
  },
});
```
Options:
| Option | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | What the LLM calls |
| `description` | string | yes | What it does |
| `schema` | Skillet | no | Argument shape |
| `handler` | fn | yes | Returns a Promise |

Handler signatures:
```ts
// with input
handler: (input: s.Infer<Schema>, abortSignal: AbortSignal) => Promise<Result>;

// without input
handler: (abortSignal: AbortSignal) => Promise<Result>;
```

### Providing the tools
- Drop them into any resource:
  ```ts
  @Component({ providers: [ShowtimesStore] })
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
          handler: async (input) =>
            this.showtimesStore.book(input),
        }),
      ],
    });
  }
  ```
- Three patterns: **read state**, **invoke service**, **mutate state**.

### Demo
- Cinema app:
  - "What's playing tonight in IMAX?" → `getShowtimes` → formatted answer
  - "Book seats A12 and A13 for the 9pm showing of MOV-142" → `bookSeats` tool-call with typed args → booking confirmed live

---

## Hashbrown Generative UI

### Why Generative UI?
- Beyond text: let the model pick your components and wire up their inputs.
- You stay in control — "You decide what can and can't be generated."
- Components are **trusted, tested, compliant** — same design system, same a11y, same brand.

### `exposeComponent()`
```ts
import { exposeComponent } from '@hashbrownai/angular';

exposeComponent(MarkdownComponent, {
  description: 'Show markdown to the user',
  input: {
    data: s.string('The markdown content'),
  },
});
```
- `description` helps the model decide when to use it.
- `input` is a Skillet schema that maps 1:1 to the component's `input()`s.
- **Type-safe**: if schema doesn't match the component's input type, TS + build will fail.

### Streaming props
- Flip a prop to `s.streaming.string()` to stream text into the component as it generates:
  ```ts
  exposeComponent(MarkdownComponent, {
    description: 'Show markdown to the user',
    input: {
      data: s.streaming.string('The markdown content'),
    },
  });
  ```
- Markdown paragraphs appear word-by-word — same mechanism as structured streaming.

### Children — flexible nesting
- `children: 'any'` — accept any exposed component as a child (rendered via `<ng-content>`):
  ```ts
  exposeComponent(MovieListComponent, {
    description: 'Show a list of movies under a heading',
    input: { title: s.string('List heading') },
    children: 'any',
  });
  ```
- Or restrict to a specific subset — lock the tree shape:
  ```ts
  exposeComponent(MovieCardComponent, {
    description: 'Show a movie as a card',
    input: {
      movieId: s.string('The movie ID'),
      title: s.streaming.string('The movie title'),
      rating: RatingSchema,
    },
    children: [
      exposeComponent(ShowtimeRowComponent, {
        description: 'A single showtime for this movie',
        input: {
          startsAt: s.string('ISO 8601 start time'),
          format: s.enumeration('Format', ['2D', '3D', 'IMAX', 'Dolby']),
          pricePerSeat: s.number('Price per seat'),
        },
      }),
      exposeComponent(GenreBadgeComponent, {
        description: 'A genre badge for this movie',
        input: { genre: s.string('Genre name') },
      }),
    ],
  });
  ```

### `uiChatResource()`
```ts
chat = uiChatResource({
  components: [
    exposeComponent(MarkdownComponent, {
      description: 'Show markdown to the user',
      input: { data: s.streaming.string('The markdown content') },
    }),
  ],
});
```
- Same shape as `chatResource`, but responses carry a UI tree.
- Options: `components`, `model`, `system`, `messages`, `tools`, `debugName`, `debounce`, `apiUrl`.

### Rendering: last assistant message
- Use `<hb-render-message>` + the `lastAssistantMessage` signal:
  ```ts
  @Component({
    template: `
      @let message = chat.lastAssistantMessage();
      @if (message) {
        <hb-render-message [message]="message" />
      }
    `,
  })
  export class UI {
    chat = uiChatResource({
      components: [ exposeComponent(ChartComponent, { /* ... */ }) ],
    });
  }
  ```

### Render all messages with components
- For chat-like experiences, iterate all messages:
  ```ts
  @Component({
    template: `
      @for (message of chat.value(); track $index) {
        @switch (message.role) {
          @case ('user') {
            <p>{{ message.content }}</p>
          }
          @case ('assistant') {
            @if (message.content) {
              <hb-render-message [message]="message" />
            }
          }
        }
      }
    `,
  })
  export class Chat {}
  ```
- `RenderMessageComponent` handles instantiation of every exposed component in the tree.

### The `prompt` tagged template literal
- Few-shot examples for UI outputs — validated at build time:
  ```ts
  uiChatResource({
    system: prompt`
      ### ROLE & TONE
      You are **Reel**, a concise cinema concierge.

      ### RULES
      1. **Never** invent movies or showtimes that don't exist.
      2. Always reference movies by ID.
      3. Admit when you cannot perform a command.

      ### EXAMPLES
      <user>What's playing tonight in IMAX?</user>
      <assistant>
        <ui>
          <app-movie-list title="Tonight in IMAX (2)">
            <app-movie-card movieId="MOV-142" title="Dune: Part Three" rating="PG-13" />
            <app-movie-card movieId="MOV-178" title="The Last Ember" rating="R" />
          </app-movie-list>
        </ui>
      </assistant>
    `,
    components: [
      exposeComponent(MovieListComponent, { /* ... */ }),
      exposeComponent(MovieCardComponent, { /* ... */ }),
    ],
  });
  ```
- What `prompt` does for you:
  1. Validates example components are in the exposed list
  2. Validates inputs against their Skillet schemas
  3. Converts the JSX-ish syntax to Hashbrown's internal JSON

### Demo
- Cinema chat:
  - "Plan my Saturday night" → streams a Markdown summary + a `MovieList` with nested `MovieCard` children, each with `ShowtimeRow` + `GenreBadge` children
  - Each child streams in one at a time
- Toggle `prompt` examples on/off, show how model follow-through tightens (correct components, correct IDs).

---

## JavaScript runtime

### Why a runtime?
- LLMs are bad at math, orchestration, and multi-step deterministic logic.
- A sandboxed JS runtime in the browser lets the model **write and run code** to do those things.
- Use cases:
  - Data transformation / orchestration
  - Charts / visualizations
  - Sequences of tasks
  - Grounding math to reduce hallucinations

### How it works
- [QuickJS](https://bellard.org/quickjs/) compiled to WebAssembly → safe sandbox.
- Hashbrown auto-generates TypeScript definitions from your registered functions and feeds them to the model.
- Flow:
  1. `createRuntime({ functions: [...] })`
  2. Declare tools with `createRuntimeFunction({ name, description, args, result, handler })`
  3. Wrap it with `createToolJavaScript({ runtime })`
  4. Pass that tool into any resource's `tools`

### `createRuntime()`
```ts
import { createRuntime } from '@hashbrownai/angular';

runtime = createRuntime({
  functions: [],
});

```
- **Always pass an AbortSignal** — `AbortSignal.timeout()` is the recommended pattern.
- Returns a Promise of whatever the script evaluated to.

### `createRuntimeFunction()`
- Define what the runtime can call. Handler runs in Angular DI context.
```ts
import { createRuntime, createRuntimeFunction } from '@hashbrownai/angular';

runtime = createRuntime({
  functions: [
    createRuntimeFunction({
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
        seatsAvailable: s.integer('Seats available'),
        theaterId: s.string('Theater ID'),
      })),
      handler: async (input) =>
        this.showtimesService.load(input.date),
    }),
    createRuntimeFunction({
      name: 'addToWatchlist',
      description: 'Add a movie to the user watchlist',
      args: s.object('Watchlist input', {
        movieId: s.string('Movie ID'),
      }),
      result: s.object('The updated entry', {
        movieId: s.string('Movie ID'),
        addedAt: s.string('ISO 8601 timestamp'),
      }),
      handler: async (input) =>
        this.watchlistService.add(input.movieId),
    }),
  ],
});
```
- `args` + `result` schemas → auto-generated TS types the model sees.
- Handlers are declared `async` but execute **synchronously** within the runtime — improves model success on procedural code.

### `createToolJavaScript()`
- Plug the runtime into any resource:
  ```ts
  import { createToolJavaScript } from '@hashbrownai/angular';

  chat = uiChatResource({
    tools: [
      createToolJavaScript({ runtime }),
    ],
  });
  ```
- Model sees one tool: "run JavaScript" — and the TS types for all your runtime functions.
- Result: the LLM authors a whole script (loops, conditionals, math) instead of a single tool call per step.

### Demo
- "Find 3 showtimes tonight between 7pm and 10pm, IMAX preferred, under $15 per seat, for a party of 4 — total under $60."
- Without runtime: many tool calls, fiddly filtering, bad at the totaling math.
- With runtime: model writes one script — `getShowtimes`, filters by time window + format + price, sorts, picks 3, totals `pricePerSeat * 4` against the $60 budget.
- Show the generated script in DevTools — real JS with `.filter`, `.reduce`, `Math.min`.

---

## Questions

- Encourage discussion: Angular integration, production considerations, security model, model choice.

---

## Thank you

### Links
- Docs: https://hashbrown.dev
- Slides: https://github.com/dominicbachmann/talks
