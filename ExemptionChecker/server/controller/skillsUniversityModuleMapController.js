const knex = require("../database.js");

exports.allMaps = async (req, res) => {
    knex.select("*").from("SkillUniversityModuleMap").then((data) => {
        res.json({ success: true, data, message: "Map fetched!" });
    }).catch((err) => {
        res.json({ success: false, message: err.message });
    });
}

exports.allMapsFromSkill = async (req, res) => {
    const { skillID } = req.body;
    knex.select("*").from("SkillUniversityModuleMap").where({ skillID: skillID }).then((data) => {
        res.json({ success: true, data, message: "Map fetched!" });
    }).catch((err) => {
        res.json({ success: false, message: err.message });
    });
}

exports.allMapsFromModule = async (req, res) => {
    console.log(req.body);
    const { moduleID } = req.body;
    knex.select("*").from("SkillUniversityModuleMap").where({ moduleID: moduleID }).then((data) => {
        res.json({ success: true, data, message: "Map fetched!" });
    }).catch((err) => {
        res.json({ success: false, message: err.message });
    });
}

exports.create = async (req, res) => {
    const { skillID, moduleID } = req.body;
    knex("SkillUniversityModuleMap").insert({ skillID: skillID, moduleID: moduleID }).then((data) => {
        res.json({ success: true, data, message: "Map created!" });
    }).catch((err) => {
        res.json({ success: false, message: err.message });
    });
}

exports.delete = async (req, res) => {
    const { skillID, moduleID } = req.body;
    knex("SkillUniversityModuleMap").where({ skillID: skillID, moduleID: moduleID }).del().then((data) => {
        res.json({ success: true, data, message: "Map deleted!" });
    }).catch((err) => {
        res.json({ success: false, message: err.message });
    });
}

exports.settings = async (req, res) => {
    const settings = {
        matchingHeaders: [
            "moduleID",
            "mid",
        ],
        tableHeaders: [
            "moduleID",
            "skillID",
        ],
    };
    res.json({ success: true, settings , message: "Settings fetched!" });
}