import { type ReactNode } from "react";
import { ContentSlide } from "./ContentSlide";
import { BODY } from "./theme";

interface BulletSlideProps {
  title: ReactNode;
  subhead?: ReactNode;
  color: string;
  bullets: ReactNode[];
  fragments?: boolean;
}

export function BulletSlide({
  title,
  subhead,
  color,
  bullets,
  fragments = true,
}: BulletSlideProps) {
  return (
    <ContentSlide title={title} subhead={subhead} color={color}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            className={fragments ? "fragment" : undefined}
            data-fragment-index={fragments ? i : undefined}
            style={{
              fontSize: "1.05em",
              fontWeight: 500,
              color: BODY,
              padding: "0.3em 0",
              paddingLeft: "1em",
              borderLeft: `3px solid ${color}`,
              marginBottom: "0.3em",
              lineHeight: 1.4,
            }}
          >
            {b}
          </li>
        ))}
      </ul>
    </ContentSlide>
  );
}
