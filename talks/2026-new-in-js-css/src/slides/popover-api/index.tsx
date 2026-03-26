import { Title } from "./Title";
import { TheOldWay } from "./TheOldWay";
import { BasicPopover } from "./BasicPopover";
import { BasicPopoverLive } from "./BasicPopoverLive";
import { PopoverActions } from "./PopoverActions";
import { AutoVsManual } from "./AutoVsManual";
import { WhenToUseWhich } from "./WhenToUseWhich";
import { TopLayerStyling } from "./TopLayerStyling";
import { StyledPopoverLive } from "./StyledPopoverLive";
import { StatusAdoption } from "./StatusAdoption";

export function PopoverApi() {
  return (
    <>
      <Title />
      <TheOldWay />
      <BasicPopover />
      <BasicPopoverLive />
      <PopoverActions />
      <AutoVsManual />
      <WhenToUseWhich />
      <TopLayerStyling />
      <StyledPopoverLive />
      <StatusAdoption />
    </>
  );
}
