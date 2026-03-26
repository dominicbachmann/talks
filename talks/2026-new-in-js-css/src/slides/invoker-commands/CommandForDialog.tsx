import { Code, Fragment, Slide } from "@revealjs/react";
import { gray, green } from "../../shared/colors";

export function CommandForDialog() {
  return (
    <Slide>
      <h2>
        Replace it with{" "}
        <code style={{ color: green }}>commandfor</code>
      </h2>
      <Code language="html" lineNumbers trim>
        {`<button commandfor="settings-dialog" command="show-modal">
  Open settings
</button>

<dialog id="settings-dialog">…</dialog>`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: gray,
            marginTop: "0.8em",
          }}
        >
          Zero JavaScript.{" "}
          <code style={{ color: green }}>commandfor</code> points to the
          target element's ID.{" "}
          <code style={{ color: green }}>command</code> says what to do.
          The browser handles the rest.
        </p>
      </Fragment>
    </Slide>
  );
}
