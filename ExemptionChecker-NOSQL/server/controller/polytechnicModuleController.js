const db = require("../database.js");
const polytechnicModules = db.collection("PolytechnicModules");

const mongodb = require("mongodb");

exports.allModules = async (req, res) => {
    polytechnicModules.find({}).toArray().then(data =>{
        res.json({success:true, data, message: "Modules fetched!"});
    })
}

exports.create = async (req, res) => {
    const {moduleCode, moduleName} = req.body;
    polytechnicModules.insertOne({
        "moduleCode": moduleCode,
        "moduleName": moduleName,
    }).then(data =>{
        res.json({success: true, data, message: "Polytechnic created!"});
    })
}

exports.delete = async (req, res) => {
    const {_id} = req.body;
    polytechnicModules.deleteOne({_id: mongodb.ObjectID(_id)}).then(data =>{
        res.json({success:true, data, message: "Polytechnic deleted!"});
    })
}

exports.update = async (req, res) => {
    const {_id, moduleCode, moduleName} = req.body;
    polytechnicModules.updateOne({_id: mongodb.ObjectId(_id)}, {$set: {moduleCode: moduleCode, moduleName: moduleName}}).then(data =>{
        res.json({success:true, data, message: "Module updated!"});
    })
}

exports.getModule = async (req, res) => {
    const {_id} = req.body;

    polytechnicModules.find({_id: mongodb.ObjectID(_id)}).toArray().then(data =>{
        res.json({success:true, data, message: "Module fetched!"});
    })
}

exports.settings = async (req, res) => {
    

    const polytechnicCourse = db.collection("PolytechnicCourses");

    var polytechnicCourses = [];

    var polytechnicCourseList = await polytechnicCourse.find({}).toArray();

    polytechnicCourseList.map((item) => {
        polytechnicCourses.push({label: item.courseCode + " - " + item.courseName, value: String(item._id)});
    });

    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "Module ID",
            },
            "moduleCode":{
                displayHeader: "Module Code",
            },
            "moduleName":{
                displayHeader: "Module Name",
            },
        }
    }

    const fieldSettings = {
        // Configures the fields of the table
        "_id": {
            type: "text",
            editable: false,
            primaryKey: true,
            displayLabel: "Module ID",
        },
        "moduleCode": {
            type: "text",
            editable: true,
            displayLabel: "Module Code",
        },
        "moduleName": {
            type: "text",
            editable: true,
            displayLabel: "Module Name",
        },
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings,
    }

    res.json({success : true, settings: settings, message: "Settings fetched!"});
}
