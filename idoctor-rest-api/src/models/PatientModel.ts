import {IMedicalCareList} from "./MedicalCareListModel";
import {Schema, model} from "mongoose";

export interface IPatient {
  fullName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  email: string;
  socialAssuranceType?: string;
  assuranceNumber?: string;
  assuranceKey?: string;
  job?: string;
  profileImage?: Schema.Types.ObjectId;
  notes?: string;
  medicalCareList: Schema.Types.ObjectId[] | IMedicalCareList[];
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<IPatient>(
  {
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    notes: {
      type: String,
    },

    assuranceKey: {type: String},
    assuranceNumber: {type: String},
    socialAssuranceType: {type: String},
    profileImage: {
      type: Schema.Types.ObjectId,
      ref: "PatientImage",
    },
    job: {
      type: String,
    },
    medicalCareList: [{type: Schema.Types.ObjectId, ref: "MedicalCareList"}],
  },
  {
    timestamps: true,
  }
);

const PatientModel = model<IPatient>("Patient", patientSchema);

export default PatientModel;
