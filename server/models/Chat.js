const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
	{
		userMessage: {
			type: String,
			required: true,
		},
		botResponse: {
			type: String,
			required: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
