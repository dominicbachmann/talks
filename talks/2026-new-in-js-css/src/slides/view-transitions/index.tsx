import { Title } from "./Title";
import { BeforeViewTransitions } from "./BeforeViewTransitions";
import { SimplestCrossfade } from "./SimplestCrossfade";
import { CrossfadeLive } from "./CrossfadeLive";
import { NamedTransitions } from "./NamedTransitions";
import { NamedTransitionsCode } from "./NamedTransitionsCode";
import { NamedTransitionsLive } from "./NamedTransitionsLive";
import { PseudoElements } from "./PseudoElements";
import { CustomAnimations } from "./CustomAnimations";
import { CustomAnimationsLive } from "./CustomAnimationsLive";
import { MpaTransitions } from "./MpaTransitions";
import { MpaTransitionsLive } from "./MpaTransitionsLive";
import { FrameworkIntegration } from "./FrameworkIntegration";
import { StatusAdoption } from "./StatusAdoption";

export function ViewTransitions() {
  return (
    <>
      <Title />
      <BeforeViewTransitions />
      <SimplestCrossfade />
      <CrossfadeLive />
      <NamedTransitions />
      <NamedTransitionsCode />
      <NamedTransitionsLive />
      <PseudoElements />
      <CustomAnimations />
      <CustomAnimationsLive />
      <MpaTransitions />
      <MpaTransitionsLive />
      <FrameworkIntegration />
      <StatusAdoption />
    </>
  );
}
