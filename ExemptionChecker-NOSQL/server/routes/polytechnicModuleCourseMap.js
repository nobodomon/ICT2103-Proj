const express = require("express");

const mapRoutes = require("../controller/polytechnicModuleCourseMapController.js");

const router = express.Router();

router.post("/allMaps", mapRoutes.allMaps);

router.post("/allMapsFromCourse", mapRoutes.allMapsFromCourse);

router.post("/allMapsFromModule", mapRoutes.allMapsFromModule);

router.post("/create", mapRoutes.create);

router.post("/delete", mapRoutes.delete);

router.post("/settings", mapRoutes.settings);

module.exports = router;



