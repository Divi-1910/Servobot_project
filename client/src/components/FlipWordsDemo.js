import React from "react";
import {FlipWords} from "./ui/flip-words";

export function FlipWordsDemo() {
	const words = ["assist", "help", "aid", "ease"];

	return (
		<div className="h-[5rem] flex justify-center items-center px-4">
			<div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
				How can I
				<FlipWords words={words} />
				you ?
			</div>
		</div>
	);
}
