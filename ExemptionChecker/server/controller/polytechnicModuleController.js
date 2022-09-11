const knex = require("../database.js");

exports.allModules = async (req, res) => {
    knex.select("*").from("PolytechnicModules").then(polytechnicModuleData =>{
        res.json({success:true, polytechnicModuleData, message: "Polytechnics fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"module code": req.body["module code"], "module name" : req.body["module name"], "Polytechnic Course":req.body["Polytechnic Course"]}).into("PolytechnicModules").then(polytechnicModuleData =>{
        res.json({success:true, polytechnicModuleData, message: "Module created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {mid} = req.body;
    knex.delete().from("PolytechnicModules").where({mid: mid}).then(polytechnicModuleData =>{
        res.json({success: true, polytechnicModuleData, message: "Polytechnic deleted!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    knex.update({mid: req.body["mid"], "module code": req.body["module code"], "module name" : req.body["module name"], "Polytechnic Course":req.body["Polytechnic Course"]}).from("PolytechnicModules").where({mid: mid}).then(polytechnicModuleData =>{
        knex.select("*").from("PolytechnicModules").then(polytechnicModuleData =>{ 
            res.json({success:true, polytechnicModuleData, message: "Polytechnics fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    
    
    polytechnicCourses = await knex.select("*").from("PolytechnicCourses").then(polyCourseData =>{
        var tempCourseList = [];
        console.log(polyCourseData);
        for(polycourse in polyCourseData){
            tempCourseList.push({label: polyCourseData[polycourse]["course code"] + " - " +  polyCourseData[polycourse]["course name"], value:  polyCourseData[polycourse]["cid"]});
        }
        console.log(tempCourseList)
        return tempCourseList;
    });

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: [
            "mid",
            "module code",
            "module name",
            "polytechnicCourse",
        ],
    }

    const fieldSettings = {
        // Configures the fields of the table
        "mid": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "Module ID",
        },
        "module code": {
            type: "text",
            editable: true,
            displayLabel: "Module Code",
        },
        "module name": {
            type: "text",
            editable: true,
            displayLabel: "Module Name",
        },
        "polytechnicCourse": {
            type: "dropdown",
            editable: true,
            displayLabel: "Polytechnic Course",
            options: polytechnicCourses,
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings,
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}
