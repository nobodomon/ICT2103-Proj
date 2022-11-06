const db = require("../database.js");
const polytechnicCourse = db.collection("PolytechnicCourses");
const mongodb = require("mongodb");

exports.allCourses = async (req, res) => {
    polytechnicCourse.find({}).toArray().then(data =>{
        res.json({success:true, data, message: "Courses fetched!"});
    })
}

exports.create = async (req, res) => {
    const {courseCode, courseName, polytechnic} = req.body;
    polytechnicCourse.insertOne({polytechnic: polytechnic, courseCode: courseCode, courseName: courseName}).then(data =>{
        res.json({success: true, data, message: "Course created!"});
    })
}

exports.delete = async (req, res) => {
    const {_id} = req.body;
    polytechnicCourse.deleteOne({_id: mongodb.ObjectID(_id)}).then(data =>{
        res.json({success:true, data, message: "Course deleted!"});
    })
}

exports.update = async (req, res) => {
    const {_id, courseCode, courseName, polytechnic} = req.body;
    polytechnicCourse.updateOne({_id: mongodb.ObjectID(_id)}, {$set: {courseCode: courseCode, courseName: courseName, polytechnic: polytechnic}}).then(data =>{
        res.json({success: true, data, message: "Course updated!"});
    })
}

exports.settings = async (req, res) => {
    const polytechnic = db.collection("Polytechnics");
    var polytechnics = [];
    await polytechnic.find({}).toArray().then(data =>{
        data.forEach(element => {
            polytechnics.push({label: element.polytechnicName, value: String(element._id)});
        });
    })


    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "Course ID",
            },
            "polytechnic":{
                displayHeader: "Polytechnic",
            },
            "courseCode":{
                displayHeader: "Course Code",
            },
            "courseName":{
                displayHeader: "Course Name",
            },
        }
    }

    const fieldSettings = {
        // Configures the fields of the table
        "_id": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "Course ID",
        },
        "polytechnic": {
            type: "dropdown",
            editable: true,
            displayLabel: "Polytechnic",
            options: polytechnics,
            foreignKey: true,
        },
        "courseCode": {
            type: "text",
            editable: true,
            displayLabel: "Course Code",
        },
        "courseName": {
            type: "text",
            editable: true,
            displayLabel: "Course Name",
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings: settings, message: "Settings fetched!"});
}