import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import RevealNotes from "reveal.js/plugin/notes";
import { TitleSlide } from "./TitleSlide";
import { TocSlide } from "./TocSlide";
import {
  WhySectionOpener,
  BenefitsSlide,
} from "./01-why-signal-forms";
import {
  FormModelsSectionOpener,
  SimpleFormModelSlide,
  FieldStateSlide,
  UpdatingFormModelsSlide,
  WritingTheModelSlide,
  TwoWayBindingSlide,
  FlatVsNestedSlide,
  StructureGuidanceSlide,
  ArraysSlide,
} from "./02-form-models";
import {
  FormModelDesignSectionOpener,
  FormVsDomainSlide,
  BestPracticesSlide,
  InitializeFieldsSlide,
  KeepFocusedSlide,
  GroupValidationSlide,
  MatchTypesSlide,
  NoDynamicStructureSlide,
  InitObjectsSlide,
  UnionDiscriminatorSlide,
  LinkedSignalMappingSlide,
  LinkedSignalGatingSlide,
  TwoWaySyncSlide,
} from "./03-form-model-design";
import {
  FieldStateSectionOpener,
  AccessingFieldStateSlide,
  FieldStateSignalsSlide,
  ValidationStateSlide,
  DisabledSlide,
  FormLevelStateSlide,
  FieldVsFormLevelSlide,
  FormRootSlide,
  SubmissionActionSlide,
} from "./04-field-state-management";
import {
  ValidationSectionOpener,
  SchemaPathSlide,
  BuiltInValidatorsSlide,
  ValidationTimingSlide,
  ApplyEachSlide,
  ValidationErrorsSlide,
  CustomValidateSlide,
  ValidateTreeSlide,
  ReusableValidatorSlide,
  CrossFieldValidationSlide,
  AsyncValidationSlide,
  StandardSchemaSlide,
  CrossFieldValidatorComparisonSlide,
  CrossFieldTemplateComparisonSlide,
} from "./05-validation";
import {
  FormLogicSectionOpener,
  HowRulesWorkSlide,
  DebounceTimeSlide,
  DebouncePromiseSlide,
  MetadataSlide,
  MetadataReducersSlide,
  ApplyWhenSlide,
  SchemaFunctionsSlide,
} from "./06-form-logic";
import {
    CustomControlsSectionOpener,
    FormValueControlSlide,
    FormCheckboxControlSlide,
    ControlStateSignalsSlide,
    AdvancedControlSlide, CvaBeforeSlide, FormValueControlAfterSlide,
} from "./07-custom-controls";
import {
  WrapUpSlide,
  QuestionsSlide,
  ThankYouSlide,
} from "./08-closing";
import { Deck } from "@revealjs/react";

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
      <WhySectionOpener />
      <BenefitsSlide />
      <FormModelsSectionOpener />
      <SimpleFormModelSlide />
      <FieldStateSlide />
      <UpdatingFormModelsSlide />
      <WritingTheModelSlide />
      <TwoWayBindingSlide />
      <FlatVsNestedSlide />
      <StructureGuidanceSlide />
      <ArraysSlide />
      <FormModelDesignSectionOpener />
      <InitializeFieldsSlide />
      <KeepFocusedSlide />
      <GroupValidationSlide />
      <MatchTypesSlide />
      <NoDynamicStructureSlide />
      <InitObjectsSlide />
      <UnionDiscriminatorSlide />
        <FormVsDomainSlide />
      <LinkedSignalMappingSlide />
      <LinkedSignalGatingSlide />
      <TwoWaySyncSlide />
      <BestPracticesSlide />
      <FieldStateSectionOpener />
      <AccessingFieldStateSlide />
      <FieldStateSignalsSlide />
      <ValidationStateSlide />
      <DisabledSlide />
      <FormLevelStateSlide />
      <FieldVsFormLevelSlide />
      <FormRootSlide />
      <SubmissionActionSlide />
      <ValidationSectionOpener />
      <SchemaPathSlide />
      <BuiltInValidatorsSlide />
      <ValidationTimingSlide />
      <ApplyEachSlide />
      <ValidationErrorsSlide />
      <CustomValidateSlide />
      <ValidateTreeSlide />
      <ReusableValidatorSlide />
      <CrossFieldValidationSlide />
      <AsyncValidationSlide />
      <StandardSchemaSlide />
      <CrossFieldValidatorComparisonSlide />
      <CrossFieldTemplateComparisonSlide />
      <FormLogicSectionOpener />
      <HowRulesWorkSlide />
      <DebounceTimeSlide />
      <DebouncePromiseSlide />
      <MetadataSlide />
      <MetadataReducersSlide />
      <ApplyWhenSlide />
      <SchemaFunctionsSlide />
      <CustomControlsSectionOpener />
      <FormValueControlSlide />
      <FormCheckboxControlSlide />
      <ControlStateSignalsSlide />
      <AdvancedControlSlide />
        <CvaBeforeSlide />
        <FormValueControlAfterSlide />
      <WrapUpSlide />
      <QuestionsSlide />
      <ThankYouSlide />
    </Deck>
  );
}

export default App;
