const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/message", messageController.sendMessage);
router.get("/messages", messageController.getMessages);

router.delete("/messages", messageController.clearMessages);

module.exports = router;
