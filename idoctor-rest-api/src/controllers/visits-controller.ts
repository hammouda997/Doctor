import {RequestHandler} from "express";
import MedicalCareListModel from "models/MedicalCareListModel";
import PatientModel, {IPatient} from "models/PatientModel";

import PatientVisitModel, {
  IPatientVisit,
  IPatientVisitType,
} from "models/PatientVisitModel";
import validationErrorHandler from "utils/validation-error-handler";

// get All visit for react big calendar and return start and end date with patient fullName as title
const getAllVisits: RequestHandler = async (req, res) => {
  try {
    const visits = await PatientVisitModel.find().populate({
      path: "patient",
      select: "fullName",
    });
    const events = visits.map((visit) => ({
      id: visit._id,
      title: (visit.patient as IPatient).fullName,
      start: visit.startDate,
      end: visit.endDate,
    }));
    res.json(events);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const deleteVisit: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }
  try {
    const visitId = req.params.visitId;
    const visit = await PatientVisitModel.findById(visitId);
    if (!visit) return res.status(404).json({message: "Visit not found"});
    const charges = await MedicalCareListModel.findById(visit.medicalCareId);
    if (!charges) return res.status(404).json({message: "Charges not found"});
    charges.visits = charges.visits.filter(
      (visit) => visit.toString() !== visitId
    );
    await charges.save();
    await visit.deleteOne();
    res.json("ok");
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const createVisit: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }
  const data = req.body as IPatientVisitType;
  try {
    const charges = await MedicalCareListModel.findById(data.medicalCareId);
    if (!charges) return res.status(404).json({message: "Charges not found"});

    const createdVisit = await PatientVisitModel.create({
      ...data,
      visitId: charges.visits.length + 1,
    });

    charges.visits.push(createdVisit._id);

    await charges.save();
    res.json(createdVisit);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
export default {
  getAllVisits,
  deleteVisit,
  createVisit,
};
