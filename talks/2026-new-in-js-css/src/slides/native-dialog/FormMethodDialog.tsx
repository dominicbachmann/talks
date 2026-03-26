import { Code, Slide } from "@revealjs/react";
import { green, gray, blue } from "../../shared/colors";
import { BulletPoint } from "../../shared/BulletPoint";

export function FormMethodDialog() {
  return (
    <Slide>
      <h2>
        Confirmation dialogs with{" "}
        <code style={{ color: green }}>&lt;form method="dialog"&gt;</code>
      </h2>
      <Code language="html" lineNumbers="1-7|9-12" trim>
        {`<dialog id="confirm">
  <h2>Delete this item?</h2>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>

<script>
  confirm.addEventListener('close', () => {
    console.log(confirm.returnValue); // "cancel" or "confirm"
  });
</script>`}
      </Code>
      <BulletPoint
        color={blue}
        label={<code>method="dialog"</code>}
        style={{ fontSize: "0.8em", color: gray, marginTop: "0.5em", textAlign: "left" }}
      >
        — submitting the form closes the dialog. The clicked button's{" "}
        <code>value</code> becomes <code>dialog.returnValue</code> — one
        event listener handles the entire flow.
      </BulletPoint>
    </Slide>
  );
}
