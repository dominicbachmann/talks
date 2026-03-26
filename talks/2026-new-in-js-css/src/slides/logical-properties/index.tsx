import { Title } from "./Title";
import { TheMentalModel } from "./TheMentalModel";
import {
  PropertyMappingInline,
  PropertyMappingBlock,
} from "./PropertyMapping";
import { PhysicalLayout } from "./PhysicalLayout";
import { RtlBreaks } from "./RtlBreaks";
import { TheLogicalFix } from "./TheLogicalFix";
import { LogicalPropertiesLive } from "./LogicalPropertiesLive";
import { StatusAdoption } from "./StatusAdoption";

export function LogicalProperties() {
  return (
    <>
      <Title />
      <TheMentalModel />
      <PropertyMappingInline />
      <PropertyMappingBlock />
      <PhysicalLayout />
      <RtlBreaks />
      <TheLogicalFix />
      <LogicalPropertiesLive />
      <StatusAdoption />
    </>
  );
}
