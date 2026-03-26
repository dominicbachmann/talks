import { Slide, Code } from "@revealjs/react";
import { blue, gray } from "../../shared/colors";
import { CodeColumns, CodeColumn } from "../../shared/CodeColumns";

export function FrameworkIntegration() {
  return (
    <Slide>
      <h2>Framework integration</h2>
      <CodeColumns gap="1em">
        <CodeColumn title="Angular" color={blue} fontSize="0.9em">
          <Code language="typescript" trim>
            {`provideRouter(routes,
  withViewTransitions()
)`}
          </Code>
          <p style={{ fontSize: "0.6em", color: gray, marginTop: "0.3em" }}>
            One function call — router navigations are
            wrapped automatically.
          </p>
        </CodeColumn>
        <CodeColumn title="React Router" color={blue} fontSize="0.9em">
          <Code language="tsx" trim>
            {`startViewTransition(() => {
  flushSync(() => {
    navigate('/detail');
  });
});`}
          </Code>
          <p style={{ fontSize: "0.6em", color: gray, marginTop: "0.3em" }}>
            <code>flushSync</code> forces synchronous DOM
            update inside the callback.
          </p>
        </CodeColumn>
        <CodeColumn title="React Canary" color={blue} fontSize="0.9em">
          <Code language="tsx" trim>
            {`<ViewTransition name="hero">
  <img src={product.image} />
</ViewTransition>`}
          </Code>
          <p style={{ fontSize: "0.6em", color: gray, marginTop: "0.3em" }}>
            Declarative — integrates with Suspense
            and concurrent rendering.
          </p>
        </CodeColumn>
      </CodeColumns>
    </Slide>
  );
}
