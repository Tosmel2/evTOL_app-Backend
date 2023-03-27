import Evtol from "../models/evtol.model.js";


// Registering an Evtol
export const evtolRegister = async(req, res) => {
    const{serialno, weight, batteryCapacity} = req.body;

    const findEvtol = await Evtol.findOne({serialno})

    if(findEvtol){
        return res.json({
            status: "error",
            message: "Evtol with that serial number already exists"
        })
    }

    await Evtol.create({
        serialno,
        model: weight <= 200 ? "Lightweight" : weight <= 300 ? "Middleweight" : weight <= 400 ? "Cruiserweight" : "Heavyweight",
        weight,
        batteryCapacity,
        state: batteryCapacity <= 25 ? "INACTIVE" : "IDLE"
    })

    res.json({
        status: "success",
        message: "Evtol added sucessfully"
    })
}

// update current user using evtol
export const currentUserOfEvtol = async(req, res) => {
    const {id} = req.params;
    const{user} = req.body;
    const evtol = await Evtol.findById(id)
    try{
        const euser = await Evtol.updateOne(evtol, {
            $set: {
                user: user
            }
        }, {
            new: true
        })

        evtol.save()

        res.json({
            status: "success",
            message: evtol
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

// find etol by serial numberl
export const getEvtolBySerial = async(req, res) => {
    const{serialno} = req.params;
    try{
        const serial = await Evtol.findOne({serialno})

        if(!serial){
            return  res.json({
                status: "error",
                message: "Serial Number Incorrect"
            })
        }

        res.json({
            status: "success",
            data: serial
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}


// editing an evtol
export const evtolEdit = async(req, res) => {
    const{weight, batteryCapacity, state} = req.body;

    try{
        await Evtol.findByIdAndUpdate(req.params.id, {
            $set: {
                model : weight <= 200 ? "Lightweight" : weight <= 300 ? "Middleweight" : weight <= 400 ? "Cruiserweight" : "Heavyweight",
                weight: weight,
                batteryCapacity: batteryCapacity,
                state: state
            }
        },
        {
            new: true
        })

        res.json({
            status: "success",
            message: "Evtol edited successfully"
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }

}

// change state of evtol
export const changeState = async(req, res) => {
    const{state} = req.body;

    try{
        await Evtol.findByIdAndUpdate(req.params.id, {
            $set: {
                state: state
            }
        },
        {
            new: true
        })

        res.json({
            status: "success",
            message: "Evtol edited successfully"
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }

}

// delete evtol
export const evtolDelete = async(req, res) => {
    const {serialno} = req.params;
    console.log(serialno)
    try{
        const evtol = await Evtol.findOne({serialno})
        console.log(evtol)

        if(!evtol){
            return res.json({
                status: "error",
                message: "Incorrect Serial Number"
            })
        }

        await Evtol.deleteOne(evtol)

        res.json({
            status: "success",
            message: "Evtol Deleted Successfully"
        })

    }catch(error){
        res.json({
            status: "success",
            message: error.message
        })
    }
}

// clear user id from evtol
export const clearUserFromEvtol = async(req, res) => {
    try{
        await Evtol.findByIdAndUpdate(req.params.id, {
            $set: {
                user: req.body.user
            }
        },{
            new: true
        })

        res.json({
            status: "success",
            message: "Evtol now available"
        })


    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

// get all evtols
export const getAllEvtols = async(req, res) => {
    const evtols = await Evtol.find()

    try{
        res.json({
            status: "success",
            data: evtols
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const getEvtolBeingUsedByUser = async(req, res) => {
    
    try{
        const evtols = await Evtol.find();
        const userEvtol = evtols.filter(e => e.user == req.userAuth)

        res.json({
            status: "success",
            data: userEvtol
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}


export const getAllAvailableEvtols = async(req, res) => {
    try{
        const evtols = await Evtol.find();
        const availableEvtols = evtols.filter(e => e.state === "IDLE")

        res.json({
            status: "success",
            data: availableEvtols
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}