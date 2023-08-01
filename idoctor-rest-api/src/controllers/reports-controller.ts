import {RequestHandler} from "express";
import PatientModel, {IPatient} from "../models/PatientModel";
import PatientVisitModel, {IPatientVisit} from "../models/PatientVisitModel";
import {startOfWeek, endOfWeek, startOfMonth, endOfMonth} from "date-fns";

export interface IVisitOverview {
  month: string;
  patients: number;
  visits: number;
}

export interface IHomeData {
  visits: IPatientVisit[];
  latestPatients: IPatient[];
  nbrOfVisitsWeek: number;
  nbrOfVisitsToday: number;
  nbrOfVisitsMonth: number;
  visitOverview: IVisitOverview[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getHomeStats: RequestHandler = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const filter = {
      startDate: {
        $gte: today,
        $lt: tomorrow,
      },
    };
    console.log(filter);

    const todayVisit = await PatientVisitModel.find(filter).populate([
      {
        path: "patient",
        select: "fullName",
      },
      {
        path: "medicalCareId",
        populate: "doctor",
      },
    ]);
    const latestPatients = await PatientModel.find()
      .sort({createdAt: -1})
      .limit(10);

    const startOfWeekDate = startOfWeek(today);
    const endOfWeekDate = endOfWeek(today);

    const nbrOfVisitsWeek = await PatientVisitModel.countDocuments({
      startDate: {
        $gte: startOfWeekDate,
        $lte: endOfWeekDate,
      },
    });

    // Calculate the start and end dates of the current month
    const startOfMonthDate = startOfMonth(today);
    const endOfMonthDate = endOfMonth(today);

    // Use the dates in the query to count the documents within the date range
    const nbrOfVisitsMonth = await PatientVisitModel.countDocuments({
      startDate: {
        $gte: startOfMonthDate,
        $lte: endOfMonthDate,
      },
    });
    // Get the total count of patients per month
    const patientsPerMonth = await PatientModel.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt", // Extract the month number from the createdAt field
          },
          count: {$sum: 1},
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInWords: monthNames,
              },
              in: {
                $arrayElemAt: ["$$monthsInWords", {$subtract: ["$_id", 1]}],
              },
            },
          },
          patients: "$count",
          _id: 0,
        },
      },
    ]);

    // Combine patientsPerMonth and visitPerMonth to get the desired IVisitOverview array
    const visitPerMonth = await PatientVisitModel.aggregate([
      {
        $group: {
          _id: {
            $month: "$startDate", // Extract the month number from the startDate field
          },
          count: {$sum: 1},
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInWords: monthNames,
              },
              in: {
                $arrayElemAt: ["$$monthsInWords", {$subtract: ["$_id", 1]}],
              },
            },
          },
          visits: "$count",
          _id: 0,
        },
      },
    ]);

    const visitOverview: IVisitOverview[] = monthNames.map((monthName) => {
      const monthEntry = patientsPerMonth.find(
        (entry) => entry.month === monthName
      );
      const {patients} = monthEntry || {patients: 0};
      const visitEntry = visitPerMonth.find(
        (entry) => entry.month === monthName
      );
      const visits = visitEntry ? visitEntry.visits : 0;
      return {month: monthName, patients, visits};
    });

    const data: IHomeData = {
      visits: todayVisit,
      latestPatients,
      nbrOfVisitsWeek,
      nbrOfVisitsToday: todayVisit.length,
      nbrOfVisitsMonth,
      visitOverview,
    };
    res.json(data);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const reportsController = {
  getHomeStats,
};

export default reportsController;
