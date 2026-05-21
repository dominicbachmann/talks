import { Slide } from "@revealjs/react";
import { GRADIENT_IMAGE, GRADIENT_LINEAR } from "./shared/theme";

const styles = {
  slide: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    background: "#111",
  },
  title: {
    fontSize: "3.2em",
    fontWeight: 800,
    lineHeight: 1.15,
    backgroundImage: GRADIENT_IMAGE,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
    textAlign: "center" as const,
  },
  subtitle: {
    fontSize: "1.4em",
    fontWeight: 400,
    color: "oklch(80% .01 0)",
    marginTop: "0.6em",
    textAlign: "center" as const,
  },
  divider: {
    width: 180,
    height: 3,
    borderRadius: 2,
    marginTop: "1.2em",
    backgroundImage: GRADIENT_LINEAR,
  },
  author: {
    fontSize: "0.9em",
    fontWeight: 400,
    color: "oklch(65% .01 0)",
    marginTop: "1.6em",
    textAlign: "center" as const,
  },
};

export function TitleSlide() {
  return (
    <Slide>
      <div style={styles.slide}>
        <h1 style={styles.title}>angular-typed-router</h1>
        <p style={styles.subtitle}>Compile-time safety for every route in your app</p>
        <div style={styles.divider} />
        <p style={styles.author}>Dominic Bachmann</p>
      </div>
    </Slide>
  );
}
