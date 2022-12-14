import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.15,
			type: "tween",
		},
	},
	exit: {
		opacity: 0,
	},
};
