import { Title } from "./Title";
import { DangerousSinks } from "./DangerousSinks";
import { XssDemo } from "./XssDemo";
import { XssDemoLive } from "./XssDemoLive";
import { Enforcement } from "./Enforcement";
import { EnforcementLive } from "./EnforcementLive";
import { CreatingPolicy } from "./CreatingPolicy";
import { FixedFlow } from "./FixedFlow";
import { FixedFlowLive } from "./FixedFlowLive";
import { DefaultPolicy } from "./DefaultPolicy";
import { AdoptionPath } from "./AdoptionPath";
import { Resources } from "./Resources";

export function TrustedTypes() {
  return (
    <>
      <Title />
      <DangerousSinks />
      <XssDemo />
      <XssDemoLive />
      <Enforcement />
      <EnforcementLive />
      <CreatingPolicy />
      <FixedFlow />
      <FixedFlowLive />
      <DefaultPolicy />
      <AdoptionPath />
      <Resources />
    </>
  );
}
