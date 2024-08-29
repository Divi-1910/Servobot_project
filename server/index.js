const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const Chat = require("./models/Chat");

const mongoURI =
	process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot_db";
mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

const clearChatHistory = async () => {
	try {
		await Chat.deleteMany({});
		console.log("Chat history cleared on server start");
	} catch (error) {
		console.error("Error clearing chat history on server start:", error);
	}
};

clearChatHistory();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
const messageRoutes = require("./routes/messageRoutes");
app.use("/api", messageRoutes);
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
