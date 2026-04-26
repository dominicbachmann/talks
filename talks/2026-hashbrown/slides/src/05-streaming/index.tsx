import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.streaming;

export function StreamingSectionOpener() {
  return <SectionOpener number="05" title="Streaming" color={COLOR} />;
}

export function WhyStreamingSlide() {
  return (
    <BulletSlide
      title="Streaming Responses"
      subhead="Stream as fast as the LLM generates — the best UX for LLM apps."
      color={COLOR}
      bullets={[
        "Skillet + Angular signals = automatic",
        <>
          As chunks arrive, <code>value()</code> updates, Angular re-renders
        </>,
        "Complete objects reach the UI — no half-parsed shapes",
      ]}
    />
  );
}

const streamingResourceSnippet = `plannedNight = structuredCompletionResource({
  input: this.plan,
  system: computed(() => \`Suggest showtimes that fit the plan.
Theaters:
\${this.theaters().map(t => \`\${t.id}: \${t.name}\`).join('\\n')}\`),
  schema: s.object('Your response', {
    showtimes: s.streaming.array('Showtimes', s.object('Showtime', {
      movieId: s.string('Movie ID'),
      startsAt: s.string('ISO 8601 start time'),
      pricePerSeat: s.number('Price per seat'),
      theaterId: s.string('Theater ID'),
    })),
  }),
});`;

export function StreamingResourceSlide() {
  return (
    <ContentSlide
      title="Streaming in a Resource"
      subhead="The outer array streams; individual objects stay complete."
      color={COLOR}
    >
      <CodePanel code={streamingResourceSnippet} fontSize="0.55em" />
    </ContentSlide>
  );
}

const streamingTemplateSnippet = `@for (s of plannedNight.value()?.showtimes ?? []; track s.movieId) {
  <app-showtime-suggestion
    [movieId]="s.movieId"
    [startsAt]="s.startsAt"
    [pricePerSeat]="s.pricePerSeat"
    [theaterId]="s.theaterId"
  />
}`;

export function StreamingTemplateSlide() {
  return (
    <ContentSlide
      title="Consuming the Stream"
      subhead="One-line change in Angular — iterate the signal."
      color={COLOR}
    >
      <CodePanel code={streamingTemplateSnippet} language="html" fontSize="0.6em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Each new array item that parses cleanly triggers a re-render — no magic,
        just signals.
      </div>
    </ContentSlide>
  );
}
