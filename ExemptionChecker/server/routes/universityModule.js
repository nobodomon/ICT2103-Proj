const express = require("express");

const moduleRoutes = require("../controller/universityModuleController.js");

const router = express.Router();

router.post("/allModules", moduleRoutes.allModules);

router.post("/create", moduleRoutes.create);

router.post("/delete", moduleRoutes.delete);

router.post("/update", moduleRoutes.update);

router.post("/settings", moduleRoutes.settings);

module.exports = router;
