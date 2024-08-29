"use client";
import React from "react";
import {HoverBorderGradient} from "./ui/hover-border-gradient";

export function HoverBorderGradientButton() {
	return (
		<div className="m-1 flex justify-center text-center">
			<HoverBorderGradient
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
				<span>Check out the bottom right corner</span>
			</HoverBorderGradient>
		</div>
	);
}
