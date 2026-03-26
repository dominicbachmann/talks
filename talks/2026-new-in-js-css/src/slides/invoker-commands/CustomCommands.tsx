import { Code, Fragment, Slide } from "@revealjs/react";
import { blue, gray, purple } from "../../shared/colors";

export function CustomCommands() {
  return (
    <Slide>
      <h2>
        Custom commands with{" "}
        <code style={{ color: purple }}>--</code> prefix
      </h2>
      <Code language="html" lineNumbers="1-8|10-18" trim>
        {`<ul id="todo-list">
  <li>
    Buy groceries
    <button commandfor="todo-list" command="--delete">Delete</button>
  </li>
  <li>
    Walk the dog
    <button commandfor="todo-list" command="--delete">Delete</button>
  </li>
</ul>

<script>
  document.getElementById('todo-list')
    .addEventListener('command', (e) => {
      if (e.command === '--delete') {
        e.source.closest('li').remove();
      }
    });
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
          One event listener on the parent handles every delete button.{" "}
          <code style={{ color: blue }}>event.source</code> is the button
          that fired it — <code style={{ color: blue }}>event.command</code>{" "}
          is the action string.
        </p>
      </Fragment>
    </Slide>
  );
}
