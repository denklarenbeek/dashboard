const express = require("express");
const { importOrders } = require("../controllers/ApiCtrl");
const { multerUploads } = require("../middleware/fileHandler");

const router = express.Router();

router.post("/import", multerUploads, importOrders);

module.exports = router;
