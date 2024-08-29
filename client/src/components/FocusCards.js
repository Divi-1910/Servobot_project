import {FocusCards} from "./ui/focus-cards";
import ecommerceImage from "../assets/ecommerce.jpg";
import healthcareImage from "../assets/healthcare.jpg";
import retailImage from "../assets/retailss.jpg";
import bankingImage from "../assets/bankingfinance.jpg";
import telecommunicationsImage from "../assets/telecommunications.jpg";
import travelImage from "../assets/travelhospitality.jpg";

export function FocusCardsDemo() {
	const cards = [
		{
			title: "E-commerce",
			src: ecommerceImage,
		},
		{
			title: "Banking & Finance",
			src: bankingImage,
		},
		{
			title: "Healthcare",
			src: healthcareImage,
		},
		{
			title: "Travel & Hospitality",
			src: travelImage,
		},
		{
			title: "Retail",
			src: retailImage,
		},
		{
			title: "Telecommunications",
			src: telecommunicationsImage,
		},
	];

	return (
		<div className="pt-10 bg-zinc-900 h-[60rem] text-center">
			<h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-lg shadow-gray-500/50 animate-pulse mb-10">
				We offer Solutions for Multiple Industries
			</h2>
			<FocusCards cards={cards} />
		</div>
	);
}
