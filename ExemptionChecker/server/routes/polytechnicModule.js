const express = require("express");

const moduleRoutes = require("../controller/polytechnicModuleController.js");

const router = express.Router();

router.post("/allModules", moduleRoutes.allModules);

router.post("/create", moduleRoutes.create);

router.post("/delete", moduleRoutes.delete);

router.post("/update", moduleRoutes.update);

router.post("/settings", moduleRoutes.settings);

router.post("/addLink", moduleRoutes.addLink);

router.post("/deleteLink", moduleRoutes.deleteLink);

router.post("/getModule", moduleRoutes.getModule);

module.exports = router;
