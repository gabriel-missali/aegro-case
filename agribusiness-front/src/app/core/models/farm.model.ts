import { StandModel } from "./stand.model";

export interface FarmModel {
  id?: number;
  name: string;
  address: string;
  description?: string;
  standsList?: StandModel[]; // TODO - Trocar o tipo
}
