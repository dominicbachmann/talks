import { Code, Fragment, Slide } from "@revealjs/react";
import { gray, green } from "../../shared/colors";

export function CommandForPopover() {
  return (
    <Slide>
      <h2>Works with popovers too</h2>
      <Code language="html" lineNumbers trim>
        {`<button commandfor="user-menu" command="toggle-popover">
  Menu
</button>

<div id="user-menu" popover>
  <a href="/profile">Profile</a>
  <a href="/settings">Settings</a>
  <a href="/logout">Log out</a>
</div>`}
      </Code>
      <Fragment animation="fade-up">
        <p
          style={{
            fontSize: "0.8em",
            color: gray,
            marginTop: "0.8em",
          }}
        >
          Same pattern — different command. Popovers support{" "}
          <code style={{ color: green }}>toggle-popover</code>,{" "}
          <code style={{ color: green }}>show-popover</code>, and{" "}
          <code style={{ color: green }}>hide-popover</code>.
        </p>
      </Fragment>
    </Slide>
  );
}
