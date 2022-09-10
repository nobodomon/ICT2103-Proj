const express = require("express");

const authRoutes = require("../controller/authController.js");

const router = express.Router();

router.post("/allUsers", authRoutes.allUsers);

router.post("/create", authRoutes.create);

router.post("/deleteUser", authRoutes.deleteUser);

router.post("/updateUser", authRoutes.updateUser);

router.post("/login", authRoutes.login);

router.post("/settings", authRoutes.settings);

module.exports = router;
