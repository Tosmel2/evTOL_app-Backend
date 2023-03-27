import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter firstname"]
    },
    lastname: {
        type: String,
        required: [true, "Please enter lastname"]
    },
    email: {
        type: String,
        required: [true, "Please enter email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    }
})

const EvtolUser = mongoose.model("EvtolUser", userSchema)
export default EvtolUser;