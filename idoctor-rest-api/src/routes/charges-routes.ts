import {Router} from "express";
import chargesController from "../controllers/charges-controller";

const chargesRoutes = Router();
chargesRoutes.get("/all", chargesController.getAllMedicalCare);
chargesRoutes.post("/", chargesController.createCharge);
chargesRoutes.get("/:chargesId", chargesController.getMedicalCare);
export default chargesRoutes;
