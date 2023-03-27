import { addToHistory, getAllHistory } from "../controllers/history.controller.js";
import express from "express"

const historyRoutes = express.Router()

// get all available evtols
historyRoutes.post("", addToHistory)

// get all available evtols
historyRoutes.get("/gethistory", getAllHistory)

export default historyRoutes