import { Code, Slide } from "@revealjs/react";
import { gray, red } from "../../shared/colors";

export function TheOldWay() {
  return (
    <Slide>
      <h2>The JavaScript way to open a dialog</h2>
      <Code language="html" lineNumbers="1|3|5-8" trim>
        {`<button id="open-btn">Open settings</button>

<dialog id="settings-dialog">…</dialog>

<script>
  const dialog = document.getElementById('settings-dialog');
  document.getElementById('open-btn')
    .addEventListener('click', () => dialog.showModal());
</script>`}
      </Code>
      <p
        style={{
          fontSize: "0.8em",
          color: gray,
          marginTop: "0.8em",
        }}
      >
        Three steps for every button-target pair:{" "}
        <code style={{ color: red }}>querySelector</code> the target,{" "}
        <code style={{ color: red }}>querySelector</code> the button,{" "}
        <code style={{ color: red }}>addEventListener</code> to glue
        them together.
      </p>
    </Slide>
  );
}
