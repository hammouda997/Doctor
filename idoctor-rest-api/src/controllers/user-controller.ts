import UserModel, {IUser} from "models/UserModel";
import {RequestHandler} from "express";
import bcrypt from "bcryptjs";

import validationErrorHandler from "utils/validation-error-handler";
import {FilterQuery} from "mongoose";
import {paginationPipeline} from "utils/pagination/paginationPipeline";
import {fuzzyRegEx} from "utils/fuzzyRegEx";

type PaginatedQuery = {
  page: string;
  field: string;
  direction: string;
  keyword: string;
  limit: string;
};
const getAllUsers: RequestHandler = async (req, res) => {
  const {
    page = "1",
    field = "createdAt",
    direction = -1,
    keyword = "",
    limit = "10",
  } = req.query as PaginatedQuery;

  const formatSort: FilterQuery<IUser> = field
    ? {[field]: Number(direction)}
    : {};

  const regEx = new RegExp(fuzzyRegEx(keyword || ""), "gi");

  try {
    const users = await UserModel.aggregate([
      {$match: {isDeleted: {$ne: true}}},
      ...paginationPipeline({
        page,
        filter: {
          $or: [{fullName: {$regex: regEx}}, {email: {$regex: regEx}}],
        },
        sort: formatSort,
        pageLimit: limit,
      }),
    ]);
    return res.json(users[0]);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const {_id, password, ...rest} = req.body;

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      rest.password = hashedPassword;
    }

    const user = await UserModel.findByIdAndUpdate(_id, rest, {
      new: true,
      upsert: true,
    });

    if (user === null) {
      return res.status(401).json({message: "User not found"});
    }

    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const {id, currentPassword, newPassword} = req.body;

  try {
    const user = await UserModel.findById(id);

    if (user === null) {
      return res.status(401).json({message: "User not found"});
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res
        .status(401)
        .json({message: "The current password is incorrect"});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(201).json({message: "Successfully changed password"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updateActiveStatus: RequestHandler = async (req, res, next) => {
  const {id, password, deactivate} = req.body;

  try {
    const user = await UserModel.findById(id);

    if (user === null) {
      return res.status(401).json({message: "User not found"});
    }

    if (deactivate) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({message: "The password is incorrect"});
      }
    }

    user.isDeactivated = deactivate;
    await user.save();

    res.status(201).json({
      message: `Successfully ${deactivate ? "de" : "re"}activated account`,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
const deleteUser: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);
  if (validationError) {
    return validationError;
  }
  try {
    await UserModel.findByIdAndUpdate({_id: req.body._id}, {isDeleted: true});
    return res.json("ok");
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getTeam: RequestHandler = async (req, res) => {
  const validationError = validationErrorHandler(req, res);
  if (validationError) {
    return validationError;
  }
  try {
    const users = await UserModel.aggregate([
      {$match: {isDeleted: {$ne: true}}},
      {
        $group: {
          _id: "$role",
          users: {$push: {_id: "$_id", fullName: "$fullName"}},
        },
      },
    ]);

    const doctors = users.find((group) => group._id === "DOCTOR")?.users || [];
    const physiotherapists =
      users.find((group) => group._id === "PHYSTOTHERAPIST")?.users || [];
    const formattedTeam = {
      doctors: doctors.map((doctor: IUser) => ({
        label: doctor.fullName,
        value: doctor._id,
      })),
      physiotherapists: physiotherapists.map((physiotherapist: IUser) => ({
        label: physiotherapist.fullName,
        value: physiotherapist._id,
      })),
    };
    return res.json(formattedTeam);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
const userController = {
  updateUser,
  updatePassword,
  updateActiveStatus,
  getAllUsers,
  deleteUser,
  getTeam,
};

export default userController;
