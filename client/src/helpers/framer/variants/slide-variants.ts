import { Variants } from "framer-motion";

/** Slide-in/out (left->right) animation. */
export const slideVariants: Variants = {
	hidden: {
		x: "-100%",
		opacity: 0,
	},
	appear: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.4,
		},
	},
	exit: {
		x: "100%",
		opacity: 0,
	},
};
