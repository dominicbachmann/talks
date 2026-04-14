import { Slide } from "@revealjs/react";

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
    backgroundImage:
      "linear-gradient(135deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68))",
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
    backgroundImage:
      "linear-gradient(90deg, oklch(51.01% .274 263.83), oklch(53.18% .28 296.97), oklch(69.02% .277 332.77), oklch(59.91% .239 8.14), oklch(63.32% .24 31.68))",
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
        <h1 style={styles.title}>Signal-based Forms</h1>
        <p style={styles.subtitle}>The new era of forms in Angular</p>
        <div style={styles.divider} />
        <p style={styles.author}>Dominic Bachmann</p>
      </div>
    </Slide>
  );
}
