const express = require("express");
const { addData } = require("../controllers/dataController");

const router = express.Router();

router.post("/add-data", addData);

module.exports = router;
