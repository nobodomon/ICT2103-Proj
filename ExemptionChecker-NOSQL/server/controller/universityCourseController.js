const db = require("../database.js");
const universityCourses = db.collection("UniversityCourses");
const mongodb = require("mongodb");

exports.allCourses = async (req, res) => {
    universityCourses.find({}).toArray((err, data) => {
        res.json({ success: true, data, message: "Courses fetched!" });
    });
}

exports.create = async (req, res) => {
    const {university, courseName, courseCode} = req.body;
    universityCourses
    .insertOne({
        "university": university, 
        "courseName": courseName, 
        "courseCode": courseCode}).then(data =>{ 
        res.json({success: true, data, message: "Course created!"});
    }).catch(err => {
        res.json({success: false, message: err.message});
    })
}

exports.delete = async (req, res) => {
    const {_id} = req.body;
    const universityModuleCourseMap = db.collection("UniversityModuleCourseMap");
    universityCourses.deleteOne({_id: mongodb.ObjectID(_id)}).then(data => {
        universityModuleCourseMap.deleteMany({universityCourse: _id}).then(data => {
            res.json({success: true, data, message: "Course deleted!"});
        }).catch(err => {
            res.json({success: false, message: err.message});
        })
    }).catch(err => {
        res.json({success: false, message: err.message});
    })
}

exports.update = async (req, res) => {
    const {_id, university, courseName, courseCode} = req.body;
    universityCourses.updateOne({_id: mongodb.ObjectID(_id)}, {$set: {university: university, courseName: courseName, courseCode: courseCode}}).then(data =>{
        res.json({success: true, data, message: "Course updated!"});
    }).catch(err => {
        res.json({success: false, message: err.message});
    })
}

exports.settings = async (req, res) => {
    const university = db.collection("Universities");
    var universities = [];
    await university.find({}).toArray().then(data =>{
        data.forEach(element => {
            universities.push({label: element.universityName, value: String(element._id)});
        });
    })

    
    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "_id":{
                displayHeader: "Course ID",
            },
            "university":{
                displayHeader: "University",
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
            type: "text",
            editable: false,
            primaryKey: true,
            displayLabel: "Course ID",
        },
        "university": {
            type: "dropdown",
            editable: true,
            displayLabel: "University",
            options: universities,
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