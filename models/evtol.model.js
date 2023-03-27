import mongoose from "mongoose";

const evtolSchema = new mongoose.Schema({
    serialno: {
        type: String,
        required: [true, "Please enter the evtol's serial number"]
    },
    model: {
        type: String,
        enum: [
          "Lightweight",
          "Middleweight",
          "Cruiserweight",
          "Heavyweight"
        ],
        required: [true, "Please choose a model for the evtol"]
    },
    weight: {
        type: Number,
        required: [true, "Please enter the weight limit"]
    },
    batteryCapacity: {
        type: Number,
        required: [true, "please enter the evtol's battery capacity"]
    },
    state: {
        type: String,
        enum: [
          "IDLE",
          "LOADING",
          "LOADED",
          "DELIVERING",
          "DELIVERED",
          "RETURNING",
          "INACTIVE"
        ],
        default: "IDLE"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EvtolUser"
    }
})

const Evtol = mongoose.model("Evtol", evtolSchema)

export default Evtol