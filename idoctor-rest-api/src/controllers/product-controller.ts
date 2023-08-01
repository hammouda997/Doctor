import ProductModel, {IProduct} from "./../models/ProductModel";
import {fuzzyRegEx} from "../utils/fuzzyRegEx";
import {paginationPipeline} from "../utils/pagination/paginationPipeline";
import {RequestHandler} from "express";
import mongoose, {FilterQuery} from "mongoose";

type PaginatedQuery = {
  page: string;
  field: string;
  direction: string;
  keyword: string;
  limit: string;
};
const getAllProducts: RequestHandler = async (req, res) => {
  const {
    page = "1",
    field = "createdAt",
    direction = -1,
    keyword = "",
    limit = "10",
    ...query
  } = req.query as PaginatedQuery;

  const formatSort: FilterQuery<IProduct> = field
    ? {[field]: Number(direction)}
    : {};

  const regEx = new RegExp(fuzzyRegEx(keyword || ""), "gi");
  try {
    const products = await ProductModel.aggregate(
      paginationPipeline({
        page,
        filter: {
          name: {$regex: regEx},
          isDeleted: false,
        },
        sort: formatSort,
        pageLimit: limit,
      })
    );
    return res.json(products[0]);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const create: RequestHandler = async (req, res) => {
  try {
    const {_id, stock, isDeleted, name, brand, description, stockAlert} =
      req.body as IProduct;
    const prodId = _id ? _id : new mongoose.Types.ObjectId();

    const product = await ProductModel.findByIdAndUpdate(
      prodId,
      {
        stock,
        isDeleted,
        name,
        brand,
        description,
        stockAlert,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.json(product);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const patientController = {
  getAllProducts,
  create,
};

export default patientController;
