import { SampleModel } from "./sample.model";

export interface StandModel {
  id?: number;
  area: number;
  productionList?: any[];
  sampleList?: SampleModel[];
  estimate?: number;
}