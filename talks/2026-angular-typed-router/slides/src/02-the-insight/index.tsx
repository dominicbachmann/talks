import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.theInsight;

export function TheInsightSectionOpener() {
  return <SectionOpener number="02" title="The Insight" color={COLOR} />;
}

export function QuestionSlide() {
  return (
    <ContentSlide
      title="What if there's a better way?"
      color={COLOR}
    >
        <p style={{ fontSize: "0.9em", color: MUTED, lineHeight: 1.2 }}>
            Other libraries like the the supabase client and Keysely also work with strings.
        </p>
      <div
        style={{
          fontSize: "1.2em",
          fontWeight: 500,
          color: BODY,
          lineHeight: 1.35,
          padding: "0.4em 0 0.4em 1em",
          borderLeft: `3px solid ${COLOR}`,
          marginBottom: "1em",
        }}
      >
        TypeScript should just <i>look at</i> the routes array
        and figure out every valid path. Right?
      </div>
      <p style={{ fontSize: "0.9em", color: MUTED, lineHeight: 1.2 }}>
        It's all sitting right there in <code>app.routes.ts</code>. Why
        should I write it down a second time?
      </p>
        <aside className="notes">
            Show how Keysely (https://kysely.dev/docs/getting-started#types) and
            Supabase Client (https://supabase.com/docs/reference/javascript/typescript-support#generating-typescript-types) work
        </aside>
    </ContentSlide>
  );
}

const pipelineCss = `
.pipeline-box {
  font-size: 0.78em;
  font-weight: 600;
  padding: 0.45em 1em;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  text-align: center;
  color: oklch(85% .01 0);
}
.pipeline-arrow {
  text-align: center;
  font-size: 1em;
  color: ${COLOR};
  opacity: 0.5;
  line-height: 1;
  margin: 0.02em 0;
}
`;

export function AhaMomentSlide() {
  const layers = [
    <>your <code>Routes</code> array</>,
    "TypeScript utility types",
    <>a union of <i>every</i> valid path</>,
  ];
  return (
    <ContentSlide
      title="The Aha Moment"
      subhead="TypeScript already knows your route tree. You just need to ask the right question."
      color={COLOR}
    >
      <style>{pipelineCss}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.1em",
          width: "65%",
          margin: "0 auto",
        }}
      >
        {layers.map((layer, i) => (
          <div key={i}>
            <div
              className="pipeline-box"
              style={{
                borderLeft: `3px solid ${COLOR}`,
                opacity: 1 - i * 0.1,
              }}
            >
              {layer}
            </div>
            {i < layers.length - 1 && (
              <div className="pipeline-arrow">↓</div>
            )}
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}
