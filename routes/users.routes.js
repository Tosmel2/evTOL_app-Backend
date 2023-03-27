import { getSpecificUser, updatePassword, updateUser, userLogin, userRegister } from "../controllers/user.controller.js"
import { isLogin } from "../middleware/isLogin.js";
import express from "express";
import { adminLogin, adminRegister, changePassword } from "../controllers/admin.controller.js";

const userRoutes = express.Router()

// Register route
userRoutes.post("/register", userRegister);

// Login route
userRoutes.post("/login", userLogin)

// get a specific user details
userRoutes.get("/specificUser", isLogin, getSpecificUser)

// update user details
userRoutes.put("/update", isLogin, updateUser)

// update password
userRoutes.put("/updatepassword", isLogin, updatePassword)

// register an admin
userRoutes.post("/admin", adminRegister);

// admin login
userRoutes.post("/adminlogin", adminLogin);

// change admin password
userRoutes.put("/adminpassword/:username", changePassword)

export default userRoutes;