import {Router} from "express";
import visitsController from "../controllers/visits-controller";

const visitsRoutes = Router();

visitsRoutes.get("/", visitsController.getAllVisits);
visitsRoutes.post("/", visitsController.createVisit);
visitsRoutes.delete("/:visitId", visitsController.deleteVisit);

export default visitsRoutes;
