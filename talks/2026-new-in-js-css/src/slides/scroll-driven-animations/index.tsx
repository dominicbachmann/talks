import { Title } from "./Title";
import { TheJsWay } from "./TheJsWay";
import { TheJsWayCode } from "./TheJsWayCode";
import { ScrollTimeline } from "./ScrollTimeline";
import { ProgressBarLive } from "./ProgressBarLive";
import { ViewTimeline } from "./ViewTimeline";
import { FadeInOnScrollLive } from "./FadeInOnScrollLive";
import { AnimationRange } from "./AnimationRange";
import { ParallaxLive } from "./ParallaxLive";
import { StatusAdoption } from "./StatusAdoption";

export function ScrollDrivenAnimations() {
  return (
    <>
      <Title />
      <TheJsWay />
      <TheJsWayCode />
      <ScrollTimeline />
      <ProgressBarLive />
      <ViewTimeline />
      <FadeInOnScrollLive />
      <AnimationRange />
      <ParallaxLive />
      <StatusAdoption />
    </>
  );
}
