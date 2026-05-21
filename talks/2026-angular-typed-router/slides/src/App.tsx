import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import RevealNotes from "reveal.js/plugin/notes";
import { Deck } from "@revealjs/react";
import { TitleSlide } from "./TitleSlide";
import { TocSlide } from "./TocSlide";
import { AboutMeSlide } from "./AboutMeSlide";
import {
  StringlyTypedSectionOpener,
  RouterIsStringsSlide,
  OpeningSlide,
  TypoExampleSlide,
  StringConstantsSlide,
  SharedConstantsSlide,
  KeyMomentSlide,
} from "./01-stringly-typed";
import {
  TheInsightSectionOpener,
  QuestionSlide,
  AhaMomentSlide,
} from "./02-the-insight";
import {
  TheResultSectionOpener,
  DemoIntroSlide,
  OneSourceOfTruthSlide,
  TenLineConnectorSlide,
  AutocompleteSlide,
  TypoCatchSlide,
  TemplateLinksSlide,
  RefactorMomentSlide,
  ParamTypesSlide,
} from "./03-the-result";
import {
  SetupSectionOpener,
  ThreeStepsSlide,
  InstallSlide,
  ConnectRoutesSlide,
  UseTypedRouterSlide,
  EslintPluginSlide,
  OverheadSlide,
} from "./04-setup";
import {
  UnderTheHoodSectionOpener,
  AsConstSatisfiesSlide,
  AugmentationSlide,
  PipelineOverviewSlide,
  ExtractRawPathsSlide,
  ExtractRouteSlide,
  RawPathToUrlSlide,
  BrandedTypesSlide,
  RawPathToCommandsSlide,
  RuntimeSlide,
} from "./05-under-the-hood";
import {
  TakeawaysSlide,
  DesignPrinciplesSlide,
  QuestionsSlide,
  ThankYouSlide,
} from "./06-closing";

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

      <StringlyTypedSectionOpener />
      <RouterIsStringsSlide />
      <OpeningSlide />
      <TypoExampleSlide />
      <StringConstantsSlide />
      <SharedConstantsSlide />
      <KeyMomentSlide />

      <TheInsightSectionOpener />
      <QuestionSlide />
      <AhaMomentSlide />

      <TheResultSectionOpener />
      <DemoIntroSlide />
      <OneSourceOfTruthSlide />
      <TenLineConnectorSlide />
      <AutocompleteSlide />
      <TypoCatchSlide />
      <TemplateLinksSlide />
      <RefactorMomentSlide />
      <ParamTypesSlide />

      <SetupSectionOpener />
      <ThreeStepsSlide />
      <InstallSlide />
      <ConnectRoutesSlide />
      <UseTypedRouterSlide />
      <EslintPluginSlide />
      <OverheadSlide />

      <UnderTheHoodSectionOpener />
      <AsConstSatisfiesSlide />
      <AugmentationSlide />
      <PipelineOverviewSlide />
      <ExtractRawPathsSlide />
      <ExtractRouteSlide />
      <RawPathToUrlSlide />
      <BrandedTypesSlide />
      <RawPathToCommandsSlide />
      <RuntimeSlide />

      <TakeawaysSlide />
      <DesignPrinciplesSlide />
      <QuestionsSlide />
      <AboutMeSlide />
      <ThankYouSlide />
    </Deck>
  );
}

export default App;
