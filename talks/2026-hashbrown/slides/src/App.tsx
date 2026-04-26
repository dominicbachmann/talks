import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import RevealNotes from "reveal.js/plugin/notes";
import { Deck } from "@revealjs/react";
import { TitleSlide } from "./TitleSlide";
import { TocSlide } from "./TocSlide";
import {
  SystemInstructionsSectionOpener,
  WhySystemInstructionsSlide,
  AuthoringFourPartsSlide,
  StructuringPromptSlide,
  RoleToneSlide,
  RulesSlide,
  ExamplesSlide,
  ManagingUserInputSlide,
  ClientVsServerSlide,
  SecuritySlide,
} from "./01-system-instructions";
import {
  AiBasicsSectionOpener,
  MessageSlide,
  MessageRolesSlide,
  AssistantTurnSlide,
  CompletionSlide,
  ErrorMessagesSlide,
  AiBasicsRecapSlide,
} from "./02-ai-basics";
import {
  ResourcesSectionOpener,
  ResourcesComparisonSlide,
  ChatResourceSlide,
  CompletionResourceSlide,
  StructuredChatResourceSlide,
  StructuredCompletionResourceSlide,
  UiChatResourceSlide,
} from "./03-resources";
import {
  SkilletSectionOpener,
  WhatIsSkilletSlide,
  PrimitivesSlide,
  CompoundValuesSlide,
  AnyOfSlide,
  EnumSlide,
  MoreSchemaSlide,
  StreamingSchemaSlide,
} from "./04-skillet-schema";
import {
  StreamingSectionOpener,
  WhyStreamingSlide,
  StreamingResourceSlide,
  StreamingTemplateSlide,
} from "./05-streaming";
import {
  ToolCallingSectionOpener,
  WhyToolsSlide,
  HowItWorksSlide,
  CreateToolSlide,
  ProvidingToolsSlide,
  ToolCallingDemoSlide,
} from "./06-tool-calling";
import {
  GenerativeUiSectionOpener,
  WhyGenerativeUiSlide,
  ExposeComponentSlide,
  StreamingPropsSlide,
  ChildrenAnySlide,
  ChildrenTypedSlide,
  UiChatResourceDeepSlide,
  RenderLastMessageSlide,
  RenderAllMessagesSlide,
  PromptTemplateSlide,
  GenerativeUiDemoSlide,
} from "./07-generative-ui";
import {
  JsRuntimeSectionOpener,
  WhyRuntimeSlide,
  HowRuntimeWorksSlide,
  CreateRuntimeSlide,
  CreateRuntimeFunctionSlide,
  CreateToolJavaScriptSlide,
  JsRuntimeDemoSlide,
} from "./08-js-runtime";
import { TakeawaysSlide, QuestionsSlide, ThankYouSlide } from "./09-closing";

function App() {
  return (
    <Deck
      plugins={[RevealNotes]}
      config={{
        hash: true,
        transition: "slide",
        width: 1280,
        height: 720,
        progress: false,
      }}
    >
      <TitleSlide />
      <TocSlide />

      <SystemInstructionsSectionOpener />
      <WhySystemInstructionsSlide />
      <AuthoringFourPartsSlide />
      <StructuringPromptSlide />
      <RoleToneSlide />
      <RulesSlide />
      <ExamplesSlide />
      <ManagingUserInputSlide />
      <ClientVsServerSlide />
      <SecuritySlide />

      <AiBasicsSectionOpener />
      <MessageSlide />
      <MessageRolesSlide />
      <AssistantTurnSlide />
      <CompletionSlide />
      <ErrorMessagesSlide />
      <AiBasicsRecapSlide />

      <ResourcesSectionOpener />
      <ResourcesComparisonSlide />
      <ChatResourceSlide />
      <CompletionResourceSlide />
      <StructuredChatResourceSlide />
      <StructuredCompletionResourceSlide />
      <UiChatResourceSlide />

      <SkilletSectionOpener />
      <WhatIsSkilletSlide />
      <PrimitivesSlide />
      <CompoundValuesSlide />
      <AnyOfSlide />
      <EnumSlide />
      <MoreSchemaSlide />
      <StreamingSchemaSlide />

      <StreamingSectionOpener />
      <WhyStreamingSlide />
      <StreamingResourceSlide />
      <StreamingTemplateSlide />

      <ToolCallingSectionOpener />
      <WhyToolsSlide />
      <HowItWorksSlide />
      <CreateToolSlide />
      <ProvidingToolsSlide />
      <ToolCallingDemoSlide />

      <GenerativeUiSectionOpener />
      <WhyGenerativeUiSlide />
      <ExposeComponentSlide />
      <StreamingPropsSlide />
      <ChildrenAnySlide />
      <ChildrenTypedSlide />
      <UiChatResourceDeepSlide />
      <RenderLastMessageSlide />
      <RenderAllMessagesSlide />
      <PromptTemplateSlide />
      <GenerativeUiDemoSlide />

      <JsRuntimeSectionOpener />
      <WhyRuntimeSlide />
      <HowRuntimeWorksSlide />
      <CreateRuntimeSlide />
      <CreateRuntimeFunctionSlide />
      <CreateToolJavaScriptSlide />
      <JsRuntimeDemoSlide />

      <TakeawaysSlide />
      <QuestionsSlide />
      <ThankYouSlide />
    </Deck>
  );
}

export default App;
