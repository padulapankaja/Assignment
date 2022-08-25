import { ETypeStatus } from './enum.interface'
export interface ICustomer {
  status: ETypeStatus;
  name: string;
  email: string;
  other?: string;
}
