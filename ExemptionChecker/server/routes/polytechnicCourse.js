const express = require("express");

const courseRoutes = require("../controller/polytechnicCourseController.js");

const router = express.Router();

router.post("/allCourses", courseRoutes.allCourses);

router.post("/create", courseRoutes.create);

router.post("/deleteCourse", courseRoutes.deleteCourse);

router.post("/updateCourse", courseRoutes.updateCourse);

router.post("/settings", courseRoutes.settings);

module.exports = router;

