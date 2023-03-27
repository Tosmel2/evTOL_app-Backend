import express from "express";
import { addMedication, clearMedications, deleteMedicationDetails, editMedicationDetails, findMedicationById, getMedicationsInEvtol } from "../controllers/medication.controller.js";
import { isLogin } from "../middleware/isLogin.js";
import multer from "multer";
import storage from "../config/cloudinary.js";

const medicationRoutes = express.Router()
const upload = multer({storage})

// Add medication
medicationRoutes.post("/addmedication", isLogin,  upload.single("medicationPicture"),addMedication);

// Edit Medication Details
medicationRoutes.put("/editmedication/:id", isLogin, upload.single("medicationPicture"), editMedicationDetails);

// delete medication details 
medicationRoutes.delete("/delete/:id", deleteMedicationDetails);

// get all medications in evtol
medicationRoutes.get("/getmedications/:id", isLogin, getMedicationsInEvtol);


// clear all medications in evtol
medicationRoutes.delete("/deleteall/:id", isLogin, clearMedications);

export default medicationRoutes;