import EvtolUser from "../models/users.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Register a user
export const userRegister = async(req, res) => {
    const{firstname, lastname, email, password} = req.body;

    try{
        const findUser = await EvtolUser.findOne({email})

        if(findUser){
            return res.json({
                status: "error",
                message: "User Exists, Please Login"
            })
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await EvtolUser.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        res.json({
            status: "success",
            data: user
            // message: "Account Created Successfully"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

// User Login
export const userLogin = async(req, res) => {
    const {email, password} = req.body;

    try{
        const findUser = await EvtolUser.findOne({email})

        if(!findUser){
            res.json({
                status: "error",
                message: "Wrong details, Please try again"
            })
        }

        const passwordFound = await bcrypt.compare(password, findUser.password)
        if(!passwordFound){
            res.json({
                status: "error",
                message: "incorrect Password"
            })
        }else{
            res.json({
                status: "success",
                data: {
                    findUser,
                    token: generateToken(findUser._id)
                }
            })
        }
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

// Get details of logged in user
export const getSpecificUser = async(req, res) => {

    try{
        const findUser = await EvtolUser.findById(req.userAuth);


        if(!findUser){
            return res.json({
                status: "error",
                message: "User does not exist"
            })
        }

        res.json({
            status: "success",
            data: findUser
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}


// update user details
export const updateUser = async(req, res) => {
    const{firstname, lastname, email} = req.body;

    const user = await EvtolUser.findById(req.userAuth)

    try{
        await EvtolUser.updateOne(user, {
            $set: {
                firstname: firstname,
                lastname: lastname,
                email: email
                
            }
        },
        {
            new: true
        })

        user.save()

        res.json({
            status: "success",
            message: "Your details have been updated successfully"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

// change password
export const updatePassword = async(req, res) => {
    const {password} = req.body;

    const user = await EvtolUser.findById(req.userAuth)

    

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt)


    try{
        await EvtolUser.updateOne(user, {
            $set: {
                password: hashedPassword
            }
        },{
            new: true
        })

        user.save()

        res.json({
            status: "success",
            message: "Password Change Successful"
        })

    }catch(error){
        res.json({
            status: "success",
            message: error.message
        })
    }
}