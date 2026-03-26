import { Title } from "./Title";
import { TheOldWay } from "./TheOldWay";
import { ModalDialog } from "./ModalDialog";
import { ModalDialogLive } from "./ModalDialogLive";
import { ShowModalVsShow } from "./ShowModalVsShow";
import { FormMethodDialog } from "./FormMethodDialog";
import { ConfirmationLive } from "./ConfirmationLive";
import { DialogVsPopover } from "./DialogVsPopover";
import { StatusAdoption } from "./StatusAdoption";

export function NativeDialog() {
  return (
    <>
      <Title />
      <TheOldWay />
      <ModalDialog />
      <ModalDialogLive />
      <ShowModalVsShow />
      <FormMethodDialog />
      <ConfirmationLive />
      <DialogVsPopover />
      <StatusAdoption />
    </>
  );
}
