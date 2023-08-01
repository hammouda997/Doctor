import {IUser} from "models/UserModel";
import {IPatientVisit} from "./PatientVisitModel";
import {Document, Schema, model} from "mongoose";
import {IPatient} from "./PatientModel";

export interface IMedicalCareListType {
  _id: Schema.Types.ObjectId;
  patient: Schema.Types.ObjectId | IPatient;
  doctor: Schema.Types.ObjectId | IUser;
  kine: Schema.Types.ObjectId | IUser;
  visits: (Schema.Types.ObjectId | IPatientVisit)[];
  totalAmount: number;
  pricePerVisit: number;
  otherCosts: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  dateFactureCNAM?: Date;
  codePECCNAM: string;
}

export interface IMedicalCareList
  extends Omit<IMedicalCareListType, "_id">,
    Document {}

const medicalCareListSchema = new Schema<IMedicalCareList>(
  {
    patient: {type: Schema.Types.ObjectId, ref: "Patient"},
    doctor: {type: Schema.Types.ObjectId, ref: "User"},
    kine: {type: Schema.Types.ObjectId, ref: "User"},
    visits: [{type: Schema.Types.ObjectId, ref: "PatientVisit"}],
    totalAmount: {type: Number},
    otherCosts: {type: Number},
    pricePerVisit: {type: Number},
    notes: {type: String},
  },
  {timestamps: true}
);

const MedicalCareListModel = model<IMedicalCareList>(
  "MedicalCareList",
  medicalCareListSchema
);

export default MedicalCareListModel;
