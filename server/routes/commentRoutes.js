const express = require("express");
const { addComment, getComments } = require("../controllers/commentController");

const router = express.Router();

router.post("/add-comment", addComment);
router.get("/comments", getComments);

module.exports = router;
