import {Router} from "express";

import patientController from "../controllers/patient-controller";
import authController from "../controllers/auth-controller";

const patientRoutes = Router();
patientRoutes.get("/all", patientController.getAllPatients);
patientRoutes.get("/optionlist", patientController.optionlist);
patientRoutes.get("/byid/:id", patientController.getPatientById);
patientRoutes.patch("/", patientController.createPatient);
patientRoutes.delete("/", patientController.deletePatient);

export default patientRoutes;
