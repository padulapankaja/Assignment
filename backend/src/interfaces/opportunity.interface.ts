import { ETypeOppertunityStatus } from "./enum.interface";

export interface IOppertunity {
  name: string;
  status: ETypeOppertunityStatus;
  customer_id: string;
}
