import { Deck } from "@revealjs/react";
import RevealHighlight from "reveal.js/plugin/highlight";
import RevealNotes from "reveal.js/plugin/notes";
import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

import { TemporalApi } from "./slides/temporal-api";
import { TrustedTypes } from "./slides/trusted-types";
import { ViewTransitions } from "./slides/view-transitions";
import { AnchorPositioning } from "./slides/anchor-positioning";
import { StartingStyle } from "./slides/starting-style";
import { PopoverApi } from "./slides/popover-api";
import { NativeDialog } from "./slides/native-dialog";
import { InvokerCommands } from "./slides/invoker-commands";
import { LogicalProperties } from "./slides/logical-properties";
import { ScrollDrivenAnimations } from "./slides/scroll-driven-animations";
import { TitleSlide } from "./slides/TitleSlide";
import { TableOfContents } from "./slides/TableOfContents";
import { Questions } from "./slides/Questions";
import { ThankYou } from "./slides/ThankYou";

function App() {
  return (
    <Deck
      plugins={[RevealHighlight, RevealNotes]}
      config={{
        hash: true,
        transition: "slide",
        width: 1280,
        height: 720,
        progress: false,
      }}
    >
      <TitleSlide />
      <TableOfContents />
      <TemporalApi />
      <TrustedTypes />
      <ViewTransitions />
      <AnchorPositioning />
      <StartingStyle />
      <PopoverApi />
      <NativeDialog />
      <InvokerCommands />
      <LogicalProperties />
      <ScrollDrivenAnimations />
      <Questions />
      <ThankYou />
    </Deck>
  );
}

export default App;
