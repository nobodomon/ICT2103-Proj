const knex = require("../database.js");

exports.allUniversities = async (req, res) => {
    knex.select("*").from("Universities").then(data =>{
        res.json({success:true, data, message: "Universities fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    console.log(req.body);
    knex.insert({"university name": req.body["university name"]}).into("Universities").then(universitdataData =>{
        res.json({success:true, data, message: "University created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {uid} = req.body;
    knex.delete().from("Universities").where({uid: uid}).then(data =>{
        res.json({success: true, data, message: "University deleted!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {

    knex.update({uid: req.body["uid"], "university name": req.body["university name"]}).from("Universities").where({uid: uid}).then(data =>{
        knex.select("*").from("Universities").then(data =>{ 
            res.json({success:true, data, message: "Universities fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: [
            "uid",
            "university name",
        ],
        
    };
    const fieldSettings = {
        // Configures the fields of the table
        "uid": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "university ID",
        },
        "university name": {
            type: "text",
            editable: true,
            displayLabel: "university Name",
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings, message: "Column settings fetched!"});
}