import {IMedicalCareListType} from "./IMedicalCare";

export interface IPatientVisit {
  _id: string;
  patient: IPatient | string;
  medicalCareId: IMedicalCareListType | string;
  startDate: Date;
  endDate: Date;
  visitId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatient {
  _id: string;
  fullName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  email: string;
  socialAssuranceType?: string;
  assuranceNumber?: string;
  assuranceKey?: string;
  job?: string;
  notes?: string;
  visits: string[] | IPatientVisit[];
  createdAt: Date;
  updatedAt: Date;
}
