import { ETypeCustomerStatus } from "./enum.interface";
export interface ICustomer {
  status: ETypeCustomerStatus;
  name: string;
  email: string;
  other?: string;
}
