import express from "express";
import { changeState, clearUserFromEvtol, currentUserOfEvtol, evtolDelete, evtolEdit, evtolRegister, getAllAvailableEvtols, getAllEvtols, getEvtolBeingUsedByUser, getEvtolBySerial } from "../controllers/evtol.controller.js";
import { isLogin } from "../middleware/isLogin.js";

const evtolRoutes = express.Router()

// register an evtol
evtolRoutes.post("/register", evtolRegister);

// add user to evtol
evtolRoutes.put("/user/:id", isLogin, currentUserOfEvtol)

// edit an evtol
evtolRoutes.put("/edit/:id", evtolEdit)

// get evtol b y serial
evtolRoutes.post("/:serialno", getEvtolBySerial)

// change state
evtolRoutes.put("/changestate/:id", changeState)

// delete an evtol
evtolRoutes.delete("/delete/:serialno", evtolDelete)

// clear current user from evtol
evtolRoutes.put("/clearuser/:id", clearUserFromEvtol)

// get all evtols
evtolRoutes.get("", getAllEvtols)

// get evtol being used by user
evtolRoutes.get("/evtolinuse", isLogin, getEvtolBeingUsedByUser)

// get all available evtols
evtolRoutes.get("/available", getAllAvailableEvtols)

export default evtolRoutes
