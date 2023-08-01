import {fuzzyRegEx} from "./../utils/fuzzyRegEx";
import {paginationPipeline} from "./../utils/pagination/paginationPipeline";
import {RequestHandler} from "express";
import mongoose, {FilterQuery} from "mongoose";

import PatientModel, {IPatient} from "../models/PatientModel";
import validationErrorHandler from "../utils/validation-error-handler";

export type PaginatedQuery = {
  fullName: string;
  page: string;
  field: string;
  direction: string;
  keyword: string;
  limit: string;
};
const getAllPatients: RequestHandler = async (req, res) => {
  const {
    page = "1",
    field = "createdAt",
    direction = -1,
    keyword = "",
    limit = "10",
  } = req.query as PaginatedQuery;

  const formatSort: FilterQuery<IPatient> = field
    ? {[field]: Number(direction)}
    : {};

  const regEx = new RegExp(fuzzyRegEx(keyword || ""), "gi");

  try {
    const patients = await PatientModel.aggregate(
      paginationPipeline({
        page,
        filter: {
          $or: [{fullName: {$regex: regEx}}, {email: {$regex: regEx}}],
        },
        sort: formatSort,
        pageLimit: limit,
      })
    );
    return res.json(patients[0]);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const deletePatient: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);
  if (validationError) {
    return validationError;
  }
  try {
    await PatientModel.deleteOne({_id: req.body._id});
    return res.json("ok");
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const createPatient: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  try {
    const {_id} = req.body;
    const patientId = _id ? _id : new mongoose.Types.ObjectId();
    const createdPatient = await PatientModel.findByIdAndUpdate(
      patientId,
      req.body,
      {new: true, upsert: true}
    );
    res.status(201).json(createdPatient);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getPatientById: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);
  if (validationError) {
    return validationError;
  }
  try {
    const patient = await PatientModel.findById(req.params.id);
    return res.json(patient);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: error.message});
  }
};
const optionlist: RequestHandler = async (req, res) => {
  try {
    const query = req.query.keyword;
    console.log(query);

    const patients = await PatientModel.find(
      query
        ? {
            $or: [
              {fullName: {$regex: query, $options: "i"}},
              {email: {$regex: query, $options: "i"}},
            ],
          }
        : {},
      "fullName"
    );
    const options = patients.map((patient) => ({
      value: patient._id,
      label: patient.fullName,
    }));
    return res.json(options);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export default {
  getAllPatients,
  createPatient,
  deletePatient,
  getPatientById,
  optionlist,
};
