const knex = require("../database.js");

exports.allCourses = async (req, res) => {
    knex.select("*").from("UniversityCourses").join("Universities", function()
        {
            this.on("UniversityCourses.university", "=", "Universities.uid")
        }).then(data =>{
        console.log(data);
        res.json({success:true, data, message: "Courses fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"university": req.body["university"], "courseName": req.body["courseName"],"courseCode": req.body["courseCode"]}).into("UniversityCourses").then(data =>{
        res.json({success:true, data, message: "Course created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {cid} = req.body;
    knex.delete().from("UniversityCourses").where({cid: cid}).then(courseData =>{
        res.json(courseData)
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    console.log(req.body);
    knex.update({cid: req.body["cid"], "university": req.body["University"], "courseName": req.body["courseName"], "courseCode": req.body["courseCode"]}).from("UniversityCourses").where({cid:  req.body["cid"]}).then(data =>{
        knex.select("*").from("UniversityCourses").then(data =>{ 
            res.json({success:true, data, message: "Courses fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    universities = await knex.select("*").from("Universities").then(universityData =>{
        var tempUniversityList = [];
        console.log(universityData);
        for(university in universityData){
            tempUniversityList.push({label: universityData[university]["universityName"], value:  universityData[university]["uid"]});
        }
        console.log(tempUniversityList)
        return tempUniversityList;
    });

    
    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: {
            "cid":{
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
        "cid": {
            type: "number",
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