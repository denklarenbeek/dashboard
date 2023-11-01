const express = require("express");
const { dashboard } = require("../controllers/DashboardCtrl");
const router = express.Router();

router.get("/", dashboard);

module.exports = router;
