import { obtainToken } from "../utils/obtainToken.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogin = (req, res, next) => {
    const token = obtainToken(req);
    const userDecoded = verifyToken(token)

    req.userAuth = userDecoded.id;

    if(!userDecoded){
        return res.json({
            status: "error",
            message: "Please login, token expired or invalid"
        })
    }else{
        next();
    }
}