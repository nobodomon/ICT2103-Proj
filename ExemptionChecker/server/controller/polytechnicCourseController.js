const knex = require("../database.js");

exports.allCourses = async (req, res) => {
    knex.select("*").from("PolytechnicCourses").join("Polytechnics", function()
        {
            this.on("PolytechnicCourses.polytechnic", "=", "Polytechnics.pid")
        }).then(data =>{
        console.log(data);
        res.json({success:true, data, message: "Courses fetched!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.create = async (req, res) => {
    knex.insert({"polytechnic": req.body["polytechnic"], "courseName": req.body["courseName"],"course code": req.body["courseCode"]}).into("PolytechnicCourses").then(data =>{
        res.json({success:true, data, message: "Course created!"});
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.delete = async (req, res) => {
    const {cid} = req.body;
    knex.delete().from("PolytechnicCourses").where({cid: cid}).then(courseData =>{
        res.json(courseData)
    }).catch(err => {
        res.json({success:false, message: err.message});
    });
}

exports.update = async (req, res) => {
    console.log(req.body);
    knex.update({cid: req.body["cid"], "polytechnic": req.body["Polytechnic"], "courseName": req.body["courseName"], "courseCode": req.body["courseCode"]}).from("PolytechnicCourses").where({cid:  req.body["cid"]}).then(data =>{
        knex.select("*").from("PolytechnicCourses").then(data =>{ 
            res.json({success:true, data, message: "Courses fetched!"});
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
            "courseCode",
            "courseName",
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