import {Router} from "express";

import reportsController from "../controllers/reports-controller";

let reportsRoutes = Router();

reportsRoutes.get("/", reportsController.getHomeStats);

export default reportsRoutes;
