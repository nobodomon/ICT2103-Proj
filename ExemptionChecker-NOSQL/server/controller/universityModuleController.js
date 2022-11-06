const knex = require("../database.js");

exports.allModules = async (req, res) => {
  knex
    .select("*")
    .from("UniversityModules")
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
      "moduleCode": req.body["moduleCode"],
      "moduleName": req.body["moduleName"],
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
      "moduleCode": req.body["moduleCode"],
      "moduleName": req.body["moduleName"],
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

  const columnSettings = {
    // Configures the headers of the table
    // Pls match header names with column names (case sensitive!)
    headers: {
      "mid": {
        displayHeader: "Module ID",
      },
      "moduleCode": {
        displayHeader: "Module Code",
      },
      "moduleName": {
        displayHeader: "Module Name",
      }
    },
  };

  const fieldSettings = {
    // Configures the fields of the table
    mid: {
      type: "number",
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
  };

  const settings = {
    columnSettings: columnSettings,
    fieldSettings: fieldSettings,
  };

  res.json({ success: true, settings: settings, message: "Settings fetched!" });
};
