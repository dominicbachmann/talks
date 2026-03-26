import { Code, Fragment, Slide } from "@revealjs/react";
import { green, gray } from "../../shared/colors";

export function ModalDialog() {
  return (
    <Slide>
      <h2>
        <code style={{ color: green }}>showModal()</code> — the native
        modal
      </h2>
      <Code language="html" lineNumbers="1|3-8|10-14" trim>
        {`<button id="open-btn">Open dialog</button>

<dialog id="my-dialog">
  <h2>Session expired</h2>
  <p>Your session has timed out.</p>
  <form method="dialog">
    <button value="ok">OK</button>
  </form>
</dialog>

<script>
  const dialog = document.getElementById('my-dialog');
  document.getElementById('open-btn')
    .addEventListener('click', () => dialog.showModal());
</script>`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: gray,
            marginTop: "0.6em",
          }}
        >
          One call to <code style={{ color: green }}>showModal()</code>{" "}
          gives you: top-layer rendering, backdrop, focus trapping, Escape to
          close, and <code>inert</code> on everything behind it.
        </p>
      </Fragment>
    </Slide>
  );
}
