const express = require("express");
const { settings } = require("../controllers/DashboardCtrl");

const router = express.Router();

router.get("/import", (req, res) => {
    res.render("import");
});

router.get("/settings", settings);

module.exports = router;
