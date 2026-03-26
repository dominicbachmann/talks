import { Fragment, Slide } from "@revealjs/react";
import { blue, border, gray, green, lightGray, red } from "../../shared/colors";

export function RtlBreaks() {
  const cardStyle: React.CSSProperties = {
    background: "#161b22",
    border: `1px solid ${border}`,
    borderRadius: "8px",
    padding: "16px",
    width: "360px",
    position: "relative",
    textAlign: "left",
    borderLeft: `3px solid ${blue}`,
  };

  const cardStyleRtl: React.CSSProperties = {
    ...cardStyle,
    direction: "rtl",
    // Physical properties don't flip — the border stays on the wrong side
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#238636",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "0.55em",
  };

  const iconStyle: React.CSSProperties = {
    float: "left",
    marginRight: "12px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: border,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8em",
  };

  return (
    <Slide>
      <h2>
        Add <code style={{ color: red }}>dir="rtl"</code> — it breaks
      </h2>
      <div
        style={{
          display: "flex",
          gap: "32px",
          justifyContent: "center",
          marginTop: "0.8em",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65em",
              color: green,
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            LTR — looks correct
          </p>
          <div style={cardStyle}>
            <span style={badgeStyle}>New</span>
            <div style={iconStyle}>A</div>
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.8em",
                  color: lightGray,
                }}
              >
                Article title
              </p>
              <p style={{ fontSize: "0.65em", color: gray }}>
                A short description of the card content.
              </p>
            </div>
          </div>
        </div>
        <Fragment animation="fade-left">
          <div>
            <p
              style={{
                fontSize: "0.65em",
                color: red,
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              RTL — accent border is on the wrong side
            </p>
            <div style={cardStyleRtl}>
              <span style={badgeStyle}>جديد</span>
              <div style={iconStyle}>أ</div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "0.8em",
                    color: lightGray,
                  }}
                >
                  عنوان المقال
                </p>
                <p style={{ fontSize: "0.65em", color: gray }}>
                  وصف قصير لمحتوى البطاقة.
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
      <Fragment animation="fade-up">
        <div
          style={{
            fontSize: "0.75em",
            color: gray,
            marginTop: "0.8em",
            textAlign: "left",
            maxWidth: "800px",
            marginInline: "auto",
          }}
        >
          <p>
            <code style={{ color: red }}>border-left</code> stays on
            the left — but in RTL, the leading edge is the{" "}
            <strong>right</strong> side. The badge is still pinned right. The
            icon still floats left. The entire layout is mirrored in content
            but not in structure.
          </p>
          <p style={{ marginTop: "0.4em" }}>
            The traditional fix: write a second stylesheet or add{" "}
            <code>[dir="rtl"]</code> overrides for every physical property.
          </p>
        </div>
      </Fragment>
    </Slide>
  );
}
