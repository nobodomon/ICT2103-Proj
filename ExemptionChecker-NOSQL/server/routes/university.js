const express = require("express");

const universityRoutes = require("../controller/universitiesController.js");

const router = express.Router();

router.post("/allUniversities", universityRoutes.allUniversities);

router.post("/create", universityRoutes.create);

router.post("/delete", universityRoutes.delete);

router.post("/update", universityRoutes.update);

router.post("/settings", universityRoutes.settings);

module.exports = router;
