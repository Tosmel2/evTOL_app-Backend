import Medication from "../models/medication.model.js";


export const addMedication = async(req, res) => {
    const{medicationName, medicationCode, weight, quantity, evtol} = req.body;

    try{
        const medications = await Medication.find();
        const medicationsInEvtol = medications.filter(med => med.evtol == evtol && med.user == req.userAuth)

        // checking if medication exists in that evtol
        const medicationExists = medicationsInEvtol.find(med => med.medicationCode === medicationCode)
        console.log(medicationExists)

        if(medicationExists){
            return res.json({
                status: "error",
                message: "Medication Code has already been added"
            })
        }

        const med = await Medication.create({
            medicationName, 
            medicationCode,
            medicationPicture: req.file.path,
            weight,
            quantity,
            evtol,
            user: req.userAuth
        })

        res.json({
            status: "success",
            data: med
            // message: "Medication has been Added"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}


// edit medication details
export const editMedicationDetails = async(req, res) => {
    const {medicationName, medicationCode, weight, quantity} = req.body;

    const medicationId = req.params.id

    try{
        const medications = await Medication.find();
        const medicationsInEvtol = medications.filter(med => med.user == req.userAuth && med._id.toString() !== medicationId)

        // checking if medication exists in that evtol
        const medicationExists = medicationsInEvtol.find(med => med.medicationCode === medicationCode )
        console.log(medicationExists)
        if(medicationExists){
            return res.json({
                status: "error",
                message: "Medication Code has already been added"
            })
        }else{
            const medToUpdate = await Medication.findById(medicationId)
            console.log(medicationName)
            const med = await Medication.updateOne(medToUpdate, {
                $set: {
                    medicationName,
                    medicationCode,
                    medicationPicture: req.file.path,
                    weight,
                    quantity,
                }
            },{
                new: true
            })
            medToUpdate.save()
    
            res.json({
                status: "success",
                data: med
            })
        }



    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    } 
}

export const deleteMedicationDetails = async(req, res) => {
    const medicationId = req.params.id;

    try{
        await Medication.findByIdAndDelete(medicationId)

        res.json({
            status: "Success",
            message: "Medication deleted Sucessfully"
        })

    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}

export const getMedicationsInEvtol = async(req, res) => {
    const evtolId = req.params.id;

    try{
        const medications = await Medication.find();
        const medicationsInEvtol = medications.filter(med => med.evtol.toString() == evtolId && med.user.toString() == req.userAuth)

        res.json({
            status: "success",
            data: medicationsInEvtol
        })


    }catch(error){
        res.json({
            status: "success",
            message: error.message
        })
    }
}

// find medication by id
export const findMedicationById = async(req, res) => {
    const medId = req.params.id;

    try{
        const medications = await Medication.findById(medId);

        res.json({
            status: "success",
            data: medications
        })


    }catch(error){
        res.json({
            status: "success",
            message: error.message
        })
    }
}

export const clearMedications = async(req, res) => {
    const evtolId = req.params.id;

    try{
        const query = {user: req.userAuth, evtol: evtolId}
        const med = await Medication.deleteMany(query)
        res.json({
            status: "success",
            data: med
        })
    }catch(error){
        res.json({
            status: "error",
            message: error.message
        })
    }
}