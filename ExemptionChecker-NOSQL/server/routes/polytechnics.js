const express = require("express");

const polytechnicRoutes = require("../controller/polytechnicsController.js");

const router = express.Router();

router.post("/allPolytechnics", polytechnicRoutes.allPolytechnics);

router.post("/create", polytechnicRoutes.create);

router.post("/delete", polytechnicRoutes.delete);

router.post("/update", polytechnicRoutes.update);

router.post("/settings", polytechnicRoutes.settings);

module.exports = router;
