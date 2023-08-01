import {IPatient, IPatientVisit} from "./IPatient";
import {IUser} from "./User";

export interface IMedicalCareListType {
  _id: string;
  patient: IPatient;
  doctor: IUser;
  kine: IUser;
  visits: IPatientVisit[];
  totalAmount: number;
  pricePerVisit: number;
  otherCosts: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  dateFactureCNAM?: Date;
  codePECCNAM: string;
}
