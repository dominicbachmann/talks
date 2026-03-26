import { Slide, Code } from "@revealjs/react";
import { red } from "../../shared/colors";

export function TheJsWayCode() {
  return (
    <Slide>
      <h2>The scroll listener boilerplate</h2>
      <h3 style={{ color: red, marginBottom: "0.6em" }}>
        A progress bar — how hard can it be?
      </h3>
      <Code language="javascript" lineNumbers trim>
        {`// Reading progress bar — the JS way
const progressBar = document.querySelector('.progress');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  const progress = scrollTop / (scrollHeight - clientHeight);
  progressBar.style.width = \`\${progress * 100}%\`;
});

// Don't forget: throttle this, handle resize,
// clean up the listener, test on mobile…`}
      </Code>
    </Slide>
  );
}
