import { Fragment, Slide } from "@revealjs/react";
import { blue, border, gray, green, lightGray, red } from "../../shared/colors";

export function TheMentalModel() {
  return (
    <Slide>
      <h2>The mental model: inline vs block</h2>
      <div
        style={{
          display: "flex",
          gap: "48px",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <div
          style={{
            flex: "0 0 360px",
            border: `2px solid ${border}`,
            borderRadius: "8px",
            padding: "24px",
            background: "#161b22",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: "0.7em",
              color: gray,
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            LTR (English, French…)
          </p>
          <div style={{ position: "relative", height: "180px" }}>
            {/* Inline axis arrow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                right: "10px",
                height: "2px",
                background: blue,
                transform: "translateY(-1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "6px",
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: `10px solid ${blue}`,
                transform: "translateY(-6px)",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "calc(50% + 10px)",
                left: "50%",
                transform: "translateX(-50%)",
                color: blue,
                fontSize: "0.75em",
                fontWeight: 600,
              }}
            >
              inline →
            </span>
            {/* Block axis arrow */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "10px",
                bottom: "10px",
                width: "2px",
                background: green,
                transform: "translateX(-1px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "6px",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: `10px solid ${green}`,
                transform: "translateX(-6px)",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "calc(50% + 12px)",
                bottom: "20px",
                color: green,
                fontSize: "0.75em",
                fontWeight: 600,
              }}
            >
              block ↓
            </span>
            {/* Sample text */}
            <span
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                fontSize: "0.7em",
                color: lightGray,
              }}
            >
              Hello world →
            </span>
          </div>
        </div>
        <Fragment animation="fade-left">
          <div
            style={{
              flex: "0 0 360px",
              border: `2px solid ${border}`,
              borderRadius: "8px",
              padding: "24px",
              background: "#161b22",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: "0.7em",
                color: gray,
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              RTL (Arabic, Hebrew…)
            </p>
            <div style={{ position: "relative", height: "180px" }}>
              {/* Inline axis arrow — reversed */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  right: "10px",
                  height: "2px",
                  background: blue,
                  transform: "translateY(-1px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "6px",
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: `10px solid ${blue}`,
                  transform: "translateY(-6px)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "calc(50% + 10px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: blue,
                  fontSize: "0.75em",
                  fontWeight: 600,
                }}
              >
                ← inline
              </span>
              {/* Block axis arrow — same */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "10px",
                  bottom: "10px",
                  width: "2px",
                  background: green,
                  transform: "translateX(-1px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "6px",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: `10px solid ${green}`,
                  transform: "translateX(-6px)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "calc(50% + 12px)",
                  bottom: "20px",
                  color: green,
                  fontSize: "0.75em",
                  fontWeight: 600,
                }}
              >
                block ↓
              </span>
              {/* Sample text */}
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  fontSize: "0.7em",
                  color: lightGray,
                  direction: "rtl",
                }}
              >
                ← مرحبا بالعالم
              </span>
            </div>
          </div>
        </Fragment>
      </div>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: gray,
            marginTop: "1em",
          }}
        >
          <strong style={{ color: blue }}>Inline</strong> = the direction
          text flows.{" "}
          <strong style={{ color: green }}>Block</strong> = the direction
          content stacks. Physical{" "}
          <code style={{ color: red }}>left</code> /{" "}
          <code style={{ color: red }}>right</code> don't flip —
          logical{" "}
          <code style={{ color: green }}>inline-start</code> /{" "}
          <code style={{ color: green }}>inline-end</code> do.
        </p>
      </Fragment>
    </Slide>
  );
}
