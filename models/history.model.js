import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    evtolSerial: {
        type: String,
        required: true
    },
    medications: [
        {
            type: String,
            required: true
        }
    ],
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const History = mongoose.model("History", historySchema)

export default History