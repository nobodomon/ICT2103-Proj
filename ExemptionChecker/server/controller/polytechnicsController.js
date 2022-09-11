const knex = require("../database.js");

exports.allPolytechnics = async (req, res) => {
    knex.select("*").from("Polytechnics").then(data =>{
        res.json({success:true, data, message: "Polytechnics fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"polytechnic name": req.body["polytechnic name"]}).into("Polytechnics").then(data =>{
        res.json({success:true, data, message: "Module created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {pid} = req.body;
    knex.delete().from("Polytechnics").where({pid: pid}).then(data =>{
        res.json({success: true, data, message: "Polytechnic deleted!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    knex.update({pid: req.body["pid"], "polytechnic name": req.body["polytechnic name"]}).from("Polytechnics").where({pid: pid}).then(data =>{
        knex.select("*").from("Polytechnics").then(data =>{ 
            res.json({success:true, data, message: "Polytechnics fetched!"});
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
            "pid",
            "polytechnic name",
        ],
    }

    const fieldSettings = {
        // Configures the fields of the table
        "pid": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "Polytechnic ID",
        },
        "polytechnic name": {
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