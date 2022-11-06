const db = require("../database.js");
const polytechnics = db.collection("Polytechnics");
const mongodb = require("mongodb");

exports.allPolytechnics = async (req, res) => {
    polytechnics.find({}).toArray((err, data) => {
        res.json({success:true, data, message: "Polytechnics fetched!"});
    });
}

exports.create = async (req, res) => {
    const {polytechnicName} = req.body;
    polytechnics.insertOne({polytechnicName: polytechnicName}, async (err, data) => {
        res.json({success:true, data, message: "Polytechnic created!"});
    })
}

exports.delete = async (req, res) => {
    const {_id} = req.body;
    polytechnics.deleteOne({_id: new mongodb.ObjectID(_id)}, async (err, result) => {
        res.json({success:true, message: "Polytechnic deleted!"});
    });
}

exports.update = async (req, res) => {
    const {_id, polytechnicName} = req.body;
    polytechnics.updateOne({_id: new mongodb.ObjectID(_id)}, {$set: {polytechnicName: polytechnicName}}, async (err, result) => {
        res.json({success:true, message: "Polytechnic updated!"});
    });
}

exports.settings = async (req, res) => {
    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "Polytechnic ID",
            },
            "polytechnicName":{
                displayHeader: "Polytechnic Name",
            },
        }
    }

    const fieldSettings = {
        // Configures the fields of the table
        "_id": {
            type: "text",
            editable: false,
            primaryKey: true,
            displayLabel: "Polytechnic ID",
        },
        "polytechnicName": {
            type: "text",
            editable: true,
            displayLabel: "Polytechnic Name",
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings: settings, message: "Settings fetched!"});
}