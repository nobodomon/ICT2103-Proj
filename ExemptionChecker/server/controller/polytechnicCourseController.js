const knex = require("../database.js");

exports.allCourses = async (req, res) => {
    knex.select("*").from("PolytechnicCourses").join("Polytechnics", function()
        {
            this.on("PolytechnicCourses.polytechnic", "=", "Polytechnics.pid")
        }).then(courseData =>{
        res.json({success:true, courseData, message: "Courses fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"polytechnic": req.body["polytechnic"], "course name": req.body["course name"],"course code": req.body["course code"]}).into("PolytechnicCourses").then(courseData =>{
        res.json({success:true, courseData, message: "Course created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.deleteCourse = async (req, res) => {
    const {cid} = req.body;
    knex.delete().from("PolytechnicCourses").where({cid: cid}).then(courseData =>{
        res.json(courseData)
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.updateCourse = async (req, res) => {
    knex.update({cid: req.body["cid"], "polytechnic": req.body["polytechnic"], "course name": req.body["course name"], "course code": req.body["course code"]}).from("PolytechnicCourses").where({cid: cid}).then(courseData =>{
        knex.select("*").from("PolytechnicCourses").then(courseData =>{ 
            res.json({success:true, courseData, message: "Courses fetched!"});
        })
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.settings = async (req, res) => {
    polytechnics = await knex.select("*").from("Polytechnics").then(polyData =>{
        var tempPolyList = [];
        console.log(polyData);
        for(poly in polyData){
            tempPolyList.push({label: polyData[poly]["polytechnic name"], value:  polyData[poly]["pid"]});
        }
        console.log(tempPolyList)
        return tempPolyList;
    });


    const columnSettings = {
        // Configures the headers of the table
        // Pls match header names with column names (case sensitive!)
        headers: [
            "cid",
            "polytechnic name",
            "course code",
            "course name",
        ],
    }

    const fieldSettings = {
        // Configures the fields of the table
        "cid": {
            type: "number",
            editable: false,
            primaryKey: true,
            displayLabel: "Course ID",
        },
        "course code": {
            type: "text",
            editable: true,
            displayLabel: "Course Code",
        },
        "course name": {
            type: "text",
            editable: true,
            displayLabel: "Course Name",
        },
        "polytechnic name": {
            type: "dropdown",
            editable: true,
            displayLabel: "Polytechnic",
            options: polytechnics,
        }
    }

    const settings = {
        columnSettings: columnSettings,
        fieldSettings: fieldSettings
    }

    res.json({success: true, settings: settings, message: "Settings fetched!"});
}