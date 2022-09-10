const knex = require("../database.js");

exports.allCourses = async (req, res) => {
    knex.select("*").from("Courses").then(courseData =>{
        res.json({success:true, courseData, message: "Courses fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"course name": req.body["course name"],"course code": req.body["course code"]}).into("Courses").then(courseData =>{
        res.json({success:true, courseData, message: "Course created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.deleteCourse = async (req, res) => {
    const {cid} = req.body;
    knex.delete().from("Courses").where({cid: cid}).then(courseData =>{
        res.json(courseData)
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.updateCourse = async (req, res) => {
    knex.update({cid: req.body["cid"], "course name": req.body["course name"], "course code": req.body["course code"]}).from("Courses").where({cid: cid}).then(courseData =>{
        knex.select("*").from("Courses").then(courseData =>{ 
            res.json({success:true, courseData, message: "Courses fetched!"});
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
            "cid",
            "course code",
            "course name",
        ],
    }

    const fieldSettings = {
        // Configures the fields of the table
        "cid": {
            type: "number",
            editable: false,
            primaryKey: true
        },
        "course code": {
            type: "text",
            editable: true
        },
        "course name": {
            type: "text",
            editable: true
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings: settings, message: "Settings fetched!"});
}