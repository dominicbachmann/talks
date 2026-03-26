import { Fragment, Slide } from "@revealjs/react";
import { red } from "../../shared/colors";

export function TheOldWay() {
  return (
    <Slide>
      <h2>What it takes to build a modal from scratch</h2>
      <ul
        style={{
          textAlign: "left",
          fontSize: "0.85em",
          marginTop: "0.8em",
          listStyle: "disc",
          paddingLeft: "1.2em",
        }}
      >
        <Fragment as="li" animation="fade-up">
          <strong style={{ color: red }}>Backdrop</strong> — a
          full-screen overlay with the right z-index that actually covers
          everything
        </Fragment>
        <Fragment as="li" animation="fade-up" style={{ marginTop: "0.4em" }}>
          <strong style={{ color: red }}>Focus trapping</strong> —
          Tab and Shift+Tab must cycle within the modal, not escape into the
          page behind it
        </Fragment>
        <Fragment as="li" animation="fade-up" style={{ marginTop: "0.4em" }}>
          <strong style={{ color: red }}>Escape key</strong> — listen
          for keydown, close the modal, clean up listeners
        </Fragment>
        <Fragment as="li" animation="fade-up" style={{ marginTop: "0.4em" }}>
          <strong style={{ color: red }}>
            Inert background
          </strong>{" "}
          — screen readers and keyboard users must not be able to interact
          with content behind the modal
        </Fragment>
        <Fragment as="li" animation="fade-up" style={{ marginTop: "0.4em" }}>
          <strong style={{ color: red }}>Scroll locking</strong> —
          prevent the page from scrolling while the modal is open
        </Fragment>
      </ul>
    </Slide>
  );
}
