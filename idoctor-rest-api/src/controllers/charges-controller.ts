import {RequestHandler} from "express";
import {FilterQuery, PipelineStage, Types} from "mongoose";

import validationErrorHandler from "utils/validation-error-handler";
import {fuzzyRegEx} from "utils/fuzzyRegEx";
import {PaginatedQuery} from "./patient-controller";
import MedicalCareListModel, {
  IMedicalCareList,
} from "models/MedicalCareListModel";
import {paginationPipeline} from "utils/pagination/paginationPipeline";

const getMedicalCare: RequestHandler = async (req, res, next) => {
  try {
    const chargeId = req.params.chargesId;
    const medicalCare = await MedicalCareListModel.findById(chargeId).populate([
      {
        path: "visits",
        options: {
          sort: {createdAt: -1},
        },
      },
      "patient",
    ]);
    res.json(medicalCare);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const createCharge: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  try {
    const {_id, ...rest} = req.body;
    const chargeId = _id ? new Types.ObjectId(_id) : new Types.ObjectId();

    const createdCharge = await MedicalCareListModel.findByIdAndUpdate(
      chargeId,
      rest,
      {upsert: true, new: true}
    ).populate([
      {
        path: "visits",
        options: {
          sort: {createdAt: -1},
        },
      },
      "patient",
    ]);

    res.json(createdCharge);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getAllMedicalCare: RequestHandler = async (req, res) => {
  const {
    page = "1",
    field = "createdAt",
    direction = -1,
    keyword = "",
    limit = "10",
  } = req.query as PaginatedQuery;

  const formatSort: FilterQuery<IMedicalCareList> = field
    ? {[field]: Number(direction)}
    : {};

  const regEx = new RegExp(fuzzyRegEx(keyword || ""), "gi");

  try {
    const medicalCare = await MedicalCareListModel.aggregate([
      lookup("patients", "$patient", "patient"),
      {$unwind: "$patient"},
      lookup("users", "$doctor", "doctor"),
      {$unwind: "$doctor"},
      lookup("users", "$kine", "kine"),
      {$unwind: "$kine"},
      ...paginationPipeline({
        filter: {
          $or: [
            {"patient.fullName": {$regex: regEx}},
            {"patient.email": {$regex: regEx}},
          ],
        },
        page,
        sort: formatSort,
        pageLimit: limit,
      }),
    ]);

    return res.json(medicalCare[0]);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export default {
  getMedicalCare,
  getAllMedicalCare,
  createCharge,
};
export const lookup = (
  from: string,
  foreignField: string,
  as: string,
  filter?: Record<string, unknown>
) =>
  ({
    $lookup: {
      from,
      let: {foreignField},
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$_id", "$$foreignField"],
            },
            ...filter,
          },
        },
      ],
      as,
    },
  } as PipelineStage);
