const express = require("express");

const courseRoutes = require("../controller/universityCourseController.js");

const router = express.Router();

router.post("/allCourses", courseRoutes.allCourses);

router.post("/create", courseRoutes.create);

router.post("/delete", courseRoutes.delete);

router.post("/update", courseRoutes.update);

router.post("/settings", courseRoutes.settings);

module.exports = router;