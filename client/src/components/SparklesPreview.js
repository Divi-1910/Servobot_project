"use client";
import React from "react";
import {SparklesCore} from "./ui/sparkles";

export function SparklesPreview() {
	return (
		<div className="h-[20rem] w-full bg-zinc-900 flex flex-col items-center justify-center overflow-hidden ">
			<h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
				Introducing <span className="text-blue-500">ServoBot</span>
			</h1>
			<div className="w-[90rem] h-40 relative">
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-3/4" />

				<SparklesCore
					background="transparent"
					minSize={0.4}
					maxSize={1}
					particleDensity={1200}
					className="w-full h-full"
					particleColor="#FFFFFF"
				/>

				<div className="absolute inset-0 w-full h-full bg-zinc-900 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
			</div>
		</div>
	);
}
