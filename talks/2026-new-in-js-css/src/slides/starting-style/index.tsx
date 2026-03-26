import { Title } from "./Title";
import { TheProblemLive } from "./TheProblemLive";
import { TheProblem } from "./TheProblem";
import { TheFix } from "./TheFix";
import { TheFixLive } from "./TheFixLive";
import { AllowDiscrete } from "./AllowDiscrete";
import { StatusAdoption } from "./StatusAdoption";

export function StartingStyle() {
  return (
    <>
      <Title />
      <TheProblemLive />
      <TheProblem />
      <TheFix />
      <TheFixLive />
      <AllowDiscrete />
      <StatusAdoption />
    </>
  );
}
