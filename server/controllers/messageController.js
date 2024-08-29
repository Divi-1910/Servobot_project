const axios = require("axios");
const Chat = require("../models/Chat");
require("dotenv").config();
const openaiApiKey = process.env.OPENAI_API_KEY;
console.log("OpenAI API Key:", openaiApiKey);

const faqResponses = {
	"how can I reset my password?":
		"To reset your password, go to the settings page and click on 'Forgot Password'.",
	"what is your return policy?":
		"Our return policy allows returns within 30 days of purchase.",
	"track my order":
		"You can track your order status on the orders page using your order number.",
	"contact support":
		"For support, please reach out to support@example.com or call us at 123-456-7890.",
};

const handleCustomerQuery = (message) => {
	const lowerCaseMessage = message.toLowerCase();
	for (const [faq, response] of Object.entries(faqResponses)) {
		if (lowerCaseMessage.includes(faq)) {
			return response;
		}
	}
	return null;
};

exports.sendMessage = async (req, res) => {
	const {message} = req.body;
	try {
		let botResponse = handleCustomerQuery(message);
		if (!botResponse) {
			const response = await axios.post(
				"https://api.openai.com/v1/chat/completions",
				{
					model: "ft:gpt-3.5-turbo-1106:personal:servobot:A1Fz2sP4",
					messages: [{role: "user", content: message}],
					max_tokens: 150,
				},
				{
					headers: {
						Authorization: `Bearer ${openaiApiKey}`,
						"Content-Type": "application/json",
					},
				}
			);
			botResponse = response.data.choices[0].message.content;
		}
		if (
			message.toLowerCase().includes("trouble") ||
			message.toLowerCase().includes("agent")
		) {
			botResponse =
				"I’m transferring you to a human agent who can assist you further.";
		}
		const chat = new Chat({
			userMessage: message,
			botResponse: botResponse,
			sessionId: req.sessionID || "anonymous-session",
		});
		await chat.save();
		res.json({answer: botResponse});
	} catch (error) {
		console.error(
			"OpenAI API error:",
			error.response ? error.response.data : error.message
		);
		res
			.status(500)
			.json({error: "An error occurred while processing your request."});
	}
};

exports.getMessages = async (req, res) => {
	try {
		const chats = await Chat.find();
		res.json(chats);
	} catch (error) {
		console.error("Error fetching messages:", error);
		res.status(500).json({error: "An error occurred while fetching messages."});
	}
};

// Function to clear chat history
exports.clearMessages = async (req, res) => {
	try {
		await Chat.deleteMany({});
		res.status(200).json({message: "All chats cleared"});
	} catch (error) {
		console.error("Error clearing messages:", error);
		res.status(500).json({error: "An error occurred while clearing messages."});
	}
};
