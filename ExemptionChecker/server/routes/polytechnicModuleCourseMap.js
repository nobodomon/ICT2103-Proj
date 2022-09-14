const express = require("express");

const mapRoutes = require("../controller/polytechnicModuleCourseMapController.js");

router.post("/allMaps", mapRoutes.allMaps);

router.post("/allMapsFromCourse", mapRoutes.allMapsFromCourse);

router.post("/allMapsFromModule", mapRoutes.allMapsFromModule);

router.post("/create", mapRoutes.create);

router.post("/delete", mapRoutes.delete);

module.exports = router;


const router = express.Router();

