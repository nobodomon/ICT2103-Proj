const express = require("express");

const skillRoutes = require("../controller/skillsController.js");

const router = express.Router();

router.post("/allSkills", skillRoutes.allSkills);

router.post("/allSkillsFromPolytechnicCourse", skillRoutes.allSkillsFromPolytechnicCourse);

router.post("/allSkillsFromUniversityCourse", skillRoutes.allSkillsFromUniversityCourse);

router.post("/create", skillRoutes.create);

router.post("/delete", skillRoutes.delete);

router.post("/update", skillRoutes.update);

router.post("/settings", skillRoutes.settings);

module.exports = router;