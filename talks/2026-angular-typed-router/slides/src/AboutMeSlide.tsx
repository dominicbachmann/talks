import { ContentSlide } from "./shared/ContentSlide";
import { SECTION_COLORS, BODY, MUTED } from "./shared/theme";
import linkedInQr from "./linked-in-qr.png";

const COLOR = SECTION_COLORS.stringlyTyped;

export function AboutMeSlide() {
  return (
    <ContentSlide title="About me" color={COLOR}>
      <div style={{ display: "flex", alignItems: "center", gap: "2.5em" }}>
        <img
          src={linkedInQr}
          alt="LinkedIn QR code"
          style={{
            width: "220px",
            height: "220px",
            objectFit: "contain",
            borderRadius: "12px",
            border: `2px solid ${COLOR}`,
            flexShrink: 0,
            background: "#000",
          }}
        />
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "1.1em",
              fontWeight: 700,
              color: BODY,
              margin: "0 0 0.15em",
            }}
          >
            Dominic Bachmann
          </h3>
          <p
            style={{
              fontSize: "0.75em",
              color: MUTED,
              margin: "0 0 0.9em",
            }}
          >
            Freelance Angular Specialist & Full Stack Developer
          </p>
          <ul
            style={{
              fontSize: "0.8em",
              color: BODY,
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: "1.2em",
            }}
          >
            <li>JavaScript Luzern Organizer</li>
            <li>Angular PixiJS</li>
            <li>Angular Image Optimizer</li>
            <li>
              github.com/dominicbachmann
            </li>
              <li>resume-creator.app</li>
          </ul>
        </div>
      </div>
    </ContentSlide>
  );
}
