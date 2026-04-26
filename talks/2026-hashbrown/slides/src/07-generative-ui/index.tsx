import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { DemoSlide } from "../shared/DemoSlide";
import { SECTION_COLORS, MUTED } from "../shared/theme";
import generativeUiTs from "../../../demos/src/app/generative-ui/generative-ui.component.ts?raw";
import generativeUiHtml from "../../../demos/src/app/generative-ui/generative-ui.component.html?raw";
import generativeUiCss from "../../../demos/src/app/generative-ui/generative-ui.component.css?raw";

const COLOR = SECTION_COLORS.generativeUi;

export function GenerativeUiSectionOpener() {
  return <SectionOpener number="07" title="Generative UI" color={COLOR} />;
}

export function WhyGenerativeUiSlide() {
  return (
    <BulletSlide
      title="Why Generative UI?"
      subhead="Beyond text: the model picks your components and wires up their inputs."
      color={COLOR}
      bullets={[
        "You decide what can and can't be generated",
        "Components are trusted, tested, compliant",
        "Same design system, same a11y, same brand",
      ]}
    />
  );
}

const exposeComponentSnippet = `import { exposeComponent } from '@hashbrownai/angular';

exposeComponent(MarkdownComponent, {
  description: 'Show markdown to the user',
  input: {
    data: s.string('The markdown content'),
  },
});`;

export function ExposeComponentSlide() {
  return (
    <ContentSlide
      title="exposeComponent()"
      subhead="Describe a component, map its inputs to a Skillet schema."
      color={COLOR}
    >
      <CodePanel code={exposeComponentSnippet} fontSize="0.62em" />
      <ul
        style={{
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
          margin: "0.8em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li><code>description</code> helps the model decide when to use it</li>
        <li><code>input</code> maps 1:1 to the component's <code>input()</code>s</li>
        <li>Type-safe — mismatched schemas fail</li>
      </ul>
    </ContentSlide>
  );
}

const streamingPropsSnippet = `exposeComponent(MarkdownComponent, {
  description: 'Show markdown to the user',
  input: {
    data: s.streaming.string('The markdown content'),
  },
});`;

export function StreamingPropsSlide() {
  return (
    <ContentSlide
      title="Streaming Props"
      subhead="Flip a prop to streaming — text arrives word by word."
      color={COLOR}
    >
      <CodePanel code={streamingPropsSnippet} fontSize="0.62em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Same mechanism as structured streaming — no extra wiring.
      </div>
    </ContentSlide>
  );
}

const anyChildrenSnippet = `exposeComponent(MovieListComponent, {
  description: 'Show a list of movies under a heading',
  input: { title: s.string('List heading') },
  children: 'any',
});`;

const typedChildrenSnippet = `exposeComponent(MovieCardComponent, {
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
});`;

export function ChildrenAnySlide() {
  return (
    <ContentSlide
      title="Children — Any"
      subhead="Accept any exposed component as a child (rendered via ng-content)."
      color={COLOR}
    >
      <CodePanel code={anyChildrenSnippet} fontSize="0.62em" />
    </ContentSlide>
  );
}

export function ChildrenTypedSlide() {
  return (
    <ContentSlide
      title="Children — Typed"
      subhead="Restrict to specific components — lock the tree shape."
      color={COLOR}
    >
      <CodePanel code={typedChildrenSnippet} fontSize="0.5em" />
    </ContentSlide>
  );
}

const uiChatResourceSnippet = `chat = uiChatResource({
  components: [
    exposeComponent(MarkdownComponent, {
      description: 'Show markdown to the user',
      input: { data: s.streaming.string('The markdown content') },
    }),
  ],
});`;

export function UiChatResourceDeepSlide() {
  return (
    <ContentSlide
      title="uiChatResource()"
      subhead="Same shape as chatResource — responses carry a UI tree."
      color={COLOR}
    >
      <CodePanel code={uiChatResourceSnippet} fontSize="0.62em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Options: <code>components</code>, <code>model</code>, <code>system</code>,
        <code>messages</code>, <code>tools</code>, <code>debugName</code>,
        <code>debounce</code>, <code>apiUrl</code>.
      </div>
    </ContentSlide>
  );
}

const renderLastSnippet = `@Component({
  template: \`
    @let message = chat.lastAssistantMessage();
    @if (message) {
      <hb-render-message [message]="message" />
    }
  \`,
})
export class UI {
  chat = uiChatResource({
    components: [ exposeComponent(ChartComponent, { /* ... */ }) ],
  });
}`;

export function RenderLastMessageSlide() {
  return (
    <ContentSlide
      title="Render the Last Message"
      subhead="Use <hb-render-message> with the lastAssistantMessage signal."
      color={COLOR}
    >
      <CodePanel code={renderLastSnippet} fontSize="0.58em" />
    </ContentSlide>
  );
}

const renderAllSnippet = `@Component({
  template: \`
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
  \`,
})
export class Chat {}`;

export function RenderAllMessagesSlide() {
  return (
    <ContentSlide
      title="Render All Messages"
      subhead="For chat-like experiences, iterate every message in the conversation."
      color={COLOR}
    >
      <CodePanel code={renderAllSnippet} fontSize="0.55em" />
    </ContentSlide>
  );
}

const promptTemplateSnippet = `uiChatResource({
  system: prompt\`
    You are **Reel**, a concise cinema concierge.

    ### EXAMPLES
    <user>What's playing tonight in IMAX?</user>
    <assistant>
      <ui>
        <app-movie-list title="Tonight in IMAX">
          <app-movie-card movieId="MOV-142"
            title="Dune: Part Three" rating="PG-13" />
        </app-movie-list>
      </ui>
    </assistant>
  \`,
  components: [
    exposeComponent(MovieListComponent, { /* ... */ }),
    exposeComponent(MovieCardComponent, { /* ... */ }),
  ],
});`;

export function PromptTemplateSlide() {
  return (
    <ContentSlide title="The prompt Tagged Template" color={COLOR}>
        <CodePanel code={promptTemplateSnippet} fontSize="0.5em" />
      <ul
        style={{
          fontSize: "0.65em",
          color: MUTED,
          lineHeight: 1.4,
          margin: "0.4em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li>Validates example components are exposed</li>
        <li>Validates inputs against their Skillet schemas</li>
        <li>Converts JSX-ish syntax to Hashbrown's internal JSON</li>
      </ul>
    </ContentSlide>
  );
}

export function GenerativeUiDemoSlide() {
  return (
    <DemoSlide
      title="Demo — Generative UI"
      src="http://localhost:4200/generative-ui"
      color={COLOR}
      tabs={[
        { label: "TS", code: generativeUiTs, language: "typescript" },
        { label: "HTML", code: generativeUiHtml, language: "html" },
        { label: "CSS", code: generativeUiCss, language: "css" },
      ]}
    />
  );
}
