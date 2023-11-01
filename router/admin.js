const express = require("express");

const router = express.Router();

router.get("/import", (req, res) => {
    res.render("import");
});

module.exports = router;
