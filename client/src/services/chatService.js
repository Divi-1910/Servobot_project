import axios from "axios";

export const sendMessageToBot = async (message) => {
	try {
		const response = await axios.post("http://localhost:5000/api/message", {
			message,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
