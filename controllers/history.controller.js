import History from "../models/history.model.js";


export const addToHistory = async(req, res) => {
    const{evtolSerial, medications, date, address} = req.body;

    try{

        const history = await History.create({
            evtolSerial,
            medications,
            date,
            address
        })

        res.json({
            status: "success",
            data: history
        })

    }catch(error){
        res.json({
            status: "error",
            message: "An error occured"
        })
    }
}


export const getAllHistory = async(req, res) => {
    const history = await History.find()

    try{
        res.json({
            status: "success",
            data: history
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}