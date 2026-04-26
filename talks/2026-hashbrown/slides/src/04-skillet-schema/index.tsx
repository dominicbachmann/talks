import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.skillet;

export function SkilletSectionOpener() {
  return <SectionOpener number="04" title="Skillet Schema" color={COLOR} />;
}

export function WhatIsSkilletSlide() {
  return (
    <BulletSlide
      title="What is Skillet?"
      subhead="A Zod-like schema language — LLM-optimized."
      color={COLOR}
      bullets={[
        "Strongly typed",
        "Purposefully limited to what LLMs support",
        "Optimized for LLM processing (descriptions are part of the schema)",
        "Streaming baked in",
      ]}
    />
  );
}

const primitivesSnippet = `s.string("The user's full name");
s.number("The user's age in years");  // floating-point
s.integer('The number of items in the cart');
s.boolean('Whether the user account is active');
s.literal('success');`;

export function PrimitivesSlide() {
  return (
    <ContentSlide
      title="Primitives"
      subhead="Every primitive takes a description — the model uses it to understand intent."
      color={COLOR}
    >
      <CodePanel code={primitivesSnippet} />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        No <code>minimum</code> / <code>maximum</code> on numbers — enforce those downstream.
      </div>
    </ContentSlide>
  );
}

const compoundSnippet = `s.object('A user profile', {
  name: s.string("The user's name"),
  age: s.number("The user's age"),
  active: s.boolean('Whether active'),
});

s.array('A list of users', s.object('A user', {
  name: s.string('Name'),
  email: s.string('Email'),
}));`;

export function CompoundValuesSlide() {
  return (
    <ContentSlide
      title="Compound Values"
      subhead="Objects and arrays — compose primitives into structured shapes."
      color={COLOR}
    >
      <CodePanel code={compoundSnippet} fontSize="0.62em" />
    </ContentSlide>
  );
}

const anyOfSnippet = `s.anyOf([
  s.object('Success response', {
    status: s.literal('success'),
    data: s.string('The response data'),
  }),
  s.object('Error response', {
    status: s.literal('error'),
    message: s.string('The error message'),
  }),
]);`;

export function AnyOfSlide() {
  return (
    <ContentSlide
      title="AnyOf"
      subhead="Discriminated unions — the model picks one shape."
      color={COLOR}
    >
      <CodePanel code={anyOfSnippet} fontSize="0.62em" />
    </ContentSlide>
  );
}

const enumSnippet = `s.enumeration('Screening format',
  ['2D', '3D', 'IMAX', 'Dolby']);`;

export function EnumSlide() {
  return (
    <ContentSlide title="Enum" color={COLOR}>
      <CodePanel code={enumSnippet} />
    </ContentSlide>
  );
}

const moreSnippet = `s.nullish();
s.anyOf([s.string('A string value'), s.nullish()]);

// type inference
const schema = s.object('Result', { code: s.string('JS code') });
type Result = s.Infer<typeof schema>;  // { code: string }`;

export function MoreSchemaSlide() {
  return (
    <ContentSlide
      title="There's More"
      subhead="Nullish, type inference, and the rest of the API."
      color={COLOR}
    >
      <CodePanel code={moreSnippet} fontSize="0.62em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Full API at{" "}
        <code style={{ background: "transparent", color: BODY }}>
          hashbrown.dev/api/core/s
        </code>
      </div>
    </ContentSlide>
  );
}

const streamingSnippet = `s.streaming.string();
s.streaming.object();
s.streaming.array();

// mix: stream the array, keep each object complete
s.streaming.array('Showtimes', s.object('Showtime', {
  movieId: s.string('Movie ID'),
  format: s.enumeration('Format',
    ['2D', '3D', 'IMAX', 'Dolby']),
}));`;

export function StreamingSchemaSlide() {
  return (
    <ContentSlide
      title="Streaming"
      subhead="The best bite for last. Add streaming to any compound or string."
      color={COLOR}
    >
      <CodePanel code={streamingSnippet} fontSize="0.6em" />
      <div
        style={{
          marginTop: "0.8em",
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.5,
        }}
      >
        Skillet eagerly parses fragments as they arrive — no custom parser code.
      </div>
    </ContentSlide>
  );
}
