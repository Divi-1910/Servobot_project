"use client";

import React from "react";
import {InfiniteMovingCards} from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
	return (
		<div className="h-[45rem]  flex flex-col antialiased bg-white dark:bg-zinc-900 items-center justify-center relative overflow-hidden">
			<h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 relative z-10">
				<span className="relative">What Our Customers Say?</span>
			</h2>
			<InfiniteMovingCards
				items={testimonials}
				direction="right"
				speed="slow"
			/>
		</div>
	);
}

const testimonials = [
	{
		quote:
			"The chatbot provided instant answers to my queries, making my experience seamless and efficient. It's like having a support agent available 24/7.",
		name: "Alice Johnson",
		title: "Customer Experience Specialist",
	},
	{
		quote:
			"I was impressed with how the chatbot handled complex questions with ease. It saved me a lot of time and was very intuitive to use.",
		name: "Michael Smith",
		title: "Tech Enthusiast",
	},
	{
		quote:
			"The integration of the chatbot into the support system was flawless. It streamlined our processes and improved overall customer satisfaction.",
		name: "Linda Brown",
		title: "Customer Support Manager",
	},
	{
		quote:
			"Using the chatbot was a breeze. It answered my questions quickly and accurately, and the interface was user-friendly.",
		name: "John Doe",
		title: "Freelance Developer",
	},
	{
		quote:
			"I appreciated the chatbot's ability to escalate issues to a human agent when necessary. It ensured that my more complex queries were handled efficiently.",
		name: "Emma Davis",
		title: "Product Designer",
	},
];
