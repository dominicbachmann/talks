import { Title } from "./Title";
import { WhatsWrongWithDate } from "./WhatsWrongWithDate";
import { TypeSystem } from "./TypeSystem";
import { TokyoDateWay } from "./TokyoDateWay";
import { TokyoTemporalWay } from "./TokyoTemporalWay";
import { CountdownDateWay } from "./CountdownDateWay";
import { CountdownTemporalWay } from "./CountdownTemporalWay";
import { Postponed } from "./Postponed";
import { Immutability } from "./Immutability";
import { Comparison } from "./Comparison";
import { StatusAdoption } from "./StatusAdoption";

export function TemporalApi() {
  return (
    <>
      <Title />
      <WhatsWrongWithDate />
      <TypeSystem />
      <TokyoDateWay />
      <TokyoTemporalWay />
      <CountdownDateWay />
      <CountdownTemporalWay />
      <Postponed />
      <Immutability />
      <Comparison />
      <StatusAdoption />
    </>
  );
}
