const express = require("express");

const moduleRoutes = require("../controller/polytechnicModuleController.js");

const router = express.Router();

router.post("/allModules", moduleRoutes.allModules);

router.post("/create", moduleRoutes.create);

router.post("/delete", moduleRoutes.delete);

router.post("/update", moduleRoutes.update);

router.post("/settings", moduleRoutes.settings);

router.post("/getModule", moduleRoutes.getModule);

module.exports = router;
