import { Slide, Code } from "@revealjs/react";
import { gray } from "../../shared/colors";

export function NamedTransitionsCode() {
  return (
    <Slide>
      <h2>Wiring it up</h2>
      <Code language="javascript" lineNumbers="1-5|7-14" trim>
        {`// In the gallery, each thumbnail gets a dynamic transition name
for (const thumb of thumbnails) {
  thumb.style.viewTransitionName = \`image-\${thumb.dataset.id}\`;
}

// Navigate to detail: the matching name morphs automatically
document.querySelector('.gallery').addEventListener('click', (e) => {
  const id = e.target.closest('[data-id]')?.dataset.id;
  if (!id) return;

  document.startViewTransition(() => {
    renderDetailView(id);
    // The detail page's hero image also has
    // view-transition-name: image-{id}
  });
});`}
      </Code>
      <p style={{ fontSize: "0.8em", color: gray, marginTop: "0.8em" }}>
        Dynamic names via <code>style.viewTransitionName</code> work too — useful
        when you have a gallery of images and need unique names per element.
      </p>
    </Slide>
  );
}
