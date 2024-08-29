import React, {useState, useEffect, useRef} from "react";
import {
	TextField,
	IconButton,
	Typography,
	Paper,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CircularProgress,
} from "@mui/material";
import {styled, keyframes} from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import {sendMessageToBot} from "../services/chatService";
import axios from "axios";

const auroraGradient = "linear-gradient(135deg, #00d2ff, #3a7bd5, #3a6073)";

const faqQuestions = [
	"How can I reset my password?",
	"What is your return policy?",
	"Track my order",
	"Contact support",
];

const slideIn = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const ChatbotContainer = styled("div")({
	position: "fixed",
	bottom: "1rem",
	right: "1rem",
	width: "360px",
	zIndex: 1000,
	fontFamily: "'Roboto', sans-serif",
	animation: `${slideIn} 0.5s ease-out`,
	background: "rgb(24,24,27)",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});

const StyledAccordion = styled(Accordion)({
	background: "rgb(24, 24, 27)",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
	overflow: "hidden",
});

const AccordionHeader = styled(AccordionSummary)({
	background: auroraGradient,
	color: "#ffffff",
	"& .MuiAccordionSummary-content": {
		display: "flex",
		alignItems: "center",
	},
});

const ChatWindow = styled(Paper)({
	background: "rgb(24,24,27)",
	color: "#333333",
	height: "400px",
	overflowY: "auto",
	padding: "1rem",
	borderTop: "1px solid #e0e0e0",
	"&::-webkit-scrollbar": {
		width: "8px",
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#bdbdbd",
		borderRadius: "4px",
	},
});

const MessageBubble = styled(Typography)(({sender}) => ({
	maxWidth: "80%",
	padding: "0.75rem 1.25rem",
	borderRadius: "20px",
	marginBottom: "0.75rem",
	background: sender === "user" ? auroraGradient : "#e0e0e0",
	color: sender === "user" ? "#ffffff" : "#333333",
	alignSelf: sender === "user" ? "flex-end" : "flex-start",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const FaqButton = styled("button")({
	background: auroraGradient,
	color: "#ffffff",
	border: "none",
	borderRadius: "8px",
	padding: "0.75rem 1rem",
	fontSize: "0.875rem",
	fontWeight: "bold",
	textTransform: "uppercase",
	cursor: "pointer",
	transition: "all 0.3s ease",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	"&:hover": {
		background: "#00796b",
	},
});

const StyledInput = styled(TextField)({
	"& .MuiOutlinedInput-root": {
		color: "#ffffff",
		"& fieldset": {
			borderColor: "#cccccc",
			borderRadius: "20px",
		},
		"&:hover fieldset": {
			borderColor: "#00d2ff",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#3a7bd5",
		},
	},
	"& .MuiInputLabel-root": {
		color: "#666666",
	},
});

const SendButton = styled(IconButton)({
	background: auroraGradient,
	color: "#ffffff",
	borderRadius: "40%",
	padding: "0.75rem",
	"&:hover": {
		background: "#00796b",
	},
});

const Chatbot = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const chatWindowRef = useRef(null);

	// useEffect(() => {
	// 	const fetchChats = async () => {
	// 		try {
	// 			const response = await axios.get("http://localhost:5000/api/messages");
	// 			setMessages(
	// 				response.data.flatMap((chat) => [
	// 					{text: chat.userMessage, sender: "user"},
	// 					{text: chat.botResponse, sender: "bot"},
	// 				])
	// 			);
	// 		} catch (error) {
	// 			console.error("Error fetching previous chats");
	// 		}
	// 	};

	// 	fetchChats();
	// }, []);

	useEffect(() => {
		if (chatWindowRef.current) {
			chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
		}
	}, [messages]); // Scroll to bottom when messages state changes

	const handleSend = async (text = message) => {
		if (text.trim()) {
			setMessages([...messages, {text, sender: "user"}]);
			setLoading(true);
			try {
				const response = await sendMessageToBot(text);
				setMessages((prevMessages) => [
					...prevMessages,
					{text: response.answer, sender: "bot"},
				]);
			} catch (error) {
				setMessages((prevMessages) => [
					...prevMessages,
					{
						text: "Sorry, something went wrong. Please try again.",
						sender: "bot",
					},
				]);
			}
			setMessage("");
			setLoading(false);
		}
	};

	const handleFaqClick = (faq) => {
		handleSend(faq);
	};

	return (
		<ChatbotContainer>
			<StyledAccordion>
				<AccordionHeader
					expandIcon={<ExpandMoreIcon sx={{color: "black"}} />}
					aria-controls="chatbot-content"
					id="chatbot-header">
					<ChatIcon sx={{marginRight: 1, color: "black"}} />

					<Typography variant="h6" sx={{fontWeight: "bold", color: "black"}}>
						ServoBot
					</Typography>
				</AccordionHeader>
				<AccordionDetails sx={{padding: 0}}>
					<ChatWindow ref={chatWindowRef}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
								background: "rgb(24,24,27)",
							}}>
							<Typography variant="h6" sx={{marginBottom: 2, color: "#00d2ff"}}>
								How can we assist you today?
							</Typography>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "0.5rem",
								}}>
								{faqQuestions.map((faq, index) => (
									<FaqButton key={index} onClick={() => handleFaqClick(faq)}>
										{faq}
									</FaqButton>
								))}
							</div>
						</div>
						{messages.map((msg, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									justifyContent:
										msg.sender === "user" ? "flex-end" : "flex-start",
								}}>
								<MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>
							</div>
						))}
					</ChatWindow>
					<div
						style={{
							display: "flex",
							padding: "1rem",
							background: "rgb(24,24,27)",
						}}>
						<StyledInput
							fullWidth
							variant="outlined"
							placeholder="Type your message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSend()}
							sx={{marginRight: 1}}
							disabled={loading}
						/>
						<SendButton onClick={() => handleSend()} disabled={loading}>
							{loading ? (
								<CircularProgress size={24} sx={{color: "#ffffff"}} />
							) : (
								<SendIcon />
							)}
						</SendButton>
					</div>
				</AccordionDetails>
			</StyledAccordion>
		</ChatbotContainer>
	);
};

export default Chatbot;
