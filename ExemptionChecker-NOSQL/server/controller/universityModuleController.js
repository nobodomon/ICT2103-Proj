const db = require("../database.js");
const universityModules = db.collection("UniversityModules");
const mongodb = require("mongodb");

exports.allModules = async (req, res) => {
  universityModules.find({}).toArray().then((data) => {
    res.json({ success: true, data, message: "University modules fetched!" });
  })
};

exports.create = async (req, res) => {
  const {moduleCode, moduleName,yearOffered, period, credits} = req.body;
  universityModules.insertOne({
    moduleCode: moduleCode, 
    moduleName: moduleName,
    yearOffered: yearOffered,
    period: period,
    credits: credits
  }).then(data =>{
    res.json({success:true, data, message: "University module created!"});
  })
};

exports.delete = async (req, res) => {
  const {_id} = req.body;

  universityModules.deleteOne({_id: mongodb.ObjectId(_id)}).then(data =>{
    res.json({success:true, data, message: "University module deleted!"});
  })
};

exports.update = async (req, res) => {
  const {_id, moduleCode, moduleName} = req.body;
  universityModules.updateOne({_id: mongodb.ObjectId(_id)}, 
  {$set: {
    moduleCode: moduleCode, 
    moduleName: moduleName,
    yearOffered: yearOffered,
    period: period,
    credits: credits
  }}).then(data =>{
    res.json({success:true, data, message: "University module updated!"});
  })
};

exports.settings = async (req, res) => {

  const columnSettings = {
    // Configures the headers of the table
    // Pls match header names with column names (case sensitive!)
    headers: {
      "_id": {
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
    "yearOffered":{
      type: "dropdown",
      editable: true,
      displayLabel: "Year Offered",
      options: [
        {value: "YEAR 1", label: "YEAR 1"},
        {value: "YEAR 2", label: "YEAR 2"},
        {value: "YEAR 3", label: "YEAR 3"},
        {value: "YEAR 4", label: "YEAR 4"},
      ]
    },
    "period":{
      type: "number",
      editable: true,
      displayLabel: "Period",
    },
    "credits":{
      type: "text",
      editable: true,
      displayLabel: "Credits",
    }
  };

  const listMapSettings = {
    "_id": {
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
  }

  const settings = {
    columnSettings: columnSettings,
    fieldSettings: fieldSettings,
    listMapSettings: listMapSettings,
  };

  res.json({ success: true, settings: settings, message: "Settings fetched!" });
};
