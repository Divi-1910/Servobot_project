import React from "react";
import {AuroraBackgroundDemo} from "./components/AuroraBackgroundDemo";
import {SparklesPreview} from "./components/SparklesPreview";
import Chatbot from "./components/Chatbot";
import {InfiniteMovingCardsDemo} from "./components/InfiniteCards";
import {GoogleGeminiEffectDemo} from "./components/GoogleGeminiEffectDemo";
import {FocusCardsDemo} from "./components/FocusCards";

function App() {
	return (
		<div>
			<AuroraBackgroundDemo />
			<SparklesPreview />
			<GoogleGeminiEffectDemo />
			<FocusCardsDemo />
			<InfiniteMovingCardsDemo />
			<Chatbot />
		</div>
	);
}

export default App;
