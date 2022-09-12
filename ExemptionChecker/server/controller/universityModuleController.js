const knex = require("../database.js");

exports.allModules = async (req, res) => {
  knex
    .select("*")
    .from("UniversityModules")
    .join("UniversityCourses", function () {
      this.on(
        "UniversityModules.universityCourse",
        "=",
        "UniversityCourses.cid"
      );
    })
    .then((data) => {
      res.json({ success: true, data, message: "University modules fetched!" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

exports.create = async (req, res) => {
  console.log(req.body);
  knex
    .insert({
      "module code": req.body["module code"],
      "module name": req.body["module name"],
      universityCourse: req.body["universityCourse"],
    })
    .into("UniversityModules")
    .then((data) => {
      res.json({ success: true, data, message: "Module created!" });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

exports.delete = async (req, res) => {
  const { mid } = req.body;
  knex
    .delete()
    .from("UniversityModules")
    .where({ mid: mid })
    .then((universityModuleData) => {
      res.json({
        success: true,
        universityModuleData,
        message: "University module deleted!",
      });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

exports.update = async (req, res) => {
  knex
    .update({
      mid: req.body["mid"],
      "module code": req.body["module code"],
      "module name": req.body["module name"],
      universityCourse: req.body["universityCourse"],
    })
    .from("UniversityModules")
    .where({ mid: mid })
    .then((data) => {
      knex
        .select("*")
        .from("UniversityModules")
        .then((data) => {
          res.json({
            success: true,
            data,
            message: "University modules fetched!",
          });
        });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};
exports.settings = async (req, res) => {
  universityCourses = await knex
    .select("*")
    .from("UniversityCourses")
    .then((uniCourseData) => {
      var tempCourseList = [];
      console.log(uniCourseData);
      for (unicourse in uniCourseData) {
        tempCourseList.push({
          label:
            uniCourseData[unicourse]["course code"] +
            " - " +
            uniCourseData[unicourse]["course name"],
          value: uniCourseData[unicourse]["cid"],
        });
      }
      console.log(tempCourseList);
      return tempCourseList;
    });

  const columnSettings = {
    // Configures the headers of the table
    // Pls match header names with column names (case sensitive!)
    headers: ["mid", "module code", "module name", "universityCourse"],
  };

  const fieldSettings = {
    // Configures the fields of the table
    mid: {
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
    "universityCourse": {
      type: "dropdown",
      editable: true,
      displayLabel: "University Course",
      options: universityCourses,
    },
  };

  const settings = {
    columnSettings: columnSettings,
    fieldSettings: fieldSettings,
  };

  res.json({ success: true, settings: settings, message: "Settings fetched!" });
};
