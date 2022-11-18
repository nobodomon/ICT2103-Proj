const db = require("../database.js");
const universities = db.collection("Universities");
const mongodb = require('mongodb');

exports.allUniversities = async (req, res) => {
    universities.find({}).toArray((err, data) => {
        res.json({success: true, data, message: "Universities fetched!"});
    })
}

exports.create = async (req, res) => {
    const {universityName} = req.body;
    
    universities.insertOne({universityName: universityName}).then(data =>{
        res.json({success:true, data, message: "University created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {_id} = req.body;

    universities.deleteOne({_id: mongodb.ObjectId(_id)}).then(data =>{
        res.json({success:true, data, message: "University deleted!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    const {_id, universityName} = req.body;
    universities.updateOne({_id:  mongodb.ObjectId(_id)}, {$set: {universityName: universityName}}).then(data =>{
        res.json({success:true, data, message: "University updated!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "University ID",
            },
            "universityName":{
                displayHeader: "University Name",
            },
        }
        
    };
    const fieldSettings = {
        // Configures the fields of the table
        "_id": {
            type: "text",
            editable: false,
            primaryKey: true,
            displayLabel: "university ID",
        },
        "universityName": {
            type: "text",
            editable: true,
            displayLabel: "universityName",
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings, message: "Column settings fetched!"});
}