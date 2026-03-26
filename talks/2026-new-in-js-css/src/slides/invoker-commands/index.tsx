import { Title } from "./Title";
import { TheOldWay } from "./TheOldWay";
import { CommandForDialog } from "./CommandForDialog";
import { CommandForPopover } from "./CommandForPopover";
import { BuiltInCommands } from "./BuiltInCommands";
import { CustomCommands } from "./CustomCommands";
import { DeclarativePayoffLive } from "./DeclarativePayoffLive";
import { StatusAdoption } from "./StatusAdoption";

export function InvokerCommands() {
  return (
    <>
      <Title />
      <TheOldWay />
      <CommandForDialog />
      <CommandForPopover />
      <BuiltInCommands />
      <CustomCommands />
      <DeclarativePayoffLive />
      <StatusAdoption />
    </>
  );
}
