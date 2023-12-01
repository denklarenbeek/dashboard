const express = require("express");
const { importOrders, dropDBCollection } = require("../controllers/ApiCtrl");
const { multerUploads } = require("../middleware/fileHandler");

const router = express.Router();

router.post("/import", multerUploads, importOrders);
router.post("/dropcollection", dropDBCollection);

module.exports = router;
