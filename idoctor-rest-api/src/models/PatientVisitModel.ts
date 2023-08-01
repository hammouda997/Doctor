import {Document, Schema, model} from "mongoose";
import {IPatient} from "./PatientModel";

export interface IPatientVisitType {
  _id: Schema.Types.ObjectId;
  patient: Schema.Types.ObjectId | IPatient;
  medicalCareId: Schema.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  visitId?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPatientVisit
  extends Omit<IPatientVisitType, "_id">,
    Document {}

const patientVisitSchema = new Schema<IPatientVisit>(
  {
    visitId: {type: Number, required: true, default: 1},
    patient: {type: Schema.Types.ObjectId, required: true, ref: "Patient"},
    medicalCareId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "MedicalCareList",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {timestamps: true}
);

const PatientVisitModel = model<IPatientVisit>(
  "PatientVisit",
  patientVisitSchema
);

export default PatientVisitModel;
