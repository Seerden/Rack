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

/** Scale horizontally by expanding from right -> left. */
export const scaleOutVariants: Variants = {
	initial: {
		color: "transparent",
		scaleX: 0,
		originX: "95%",
		originY: "50%",
	},
	animate: {
		color: "black",
		scaleX: 1,
	},
	exit: {
		color: "transparent",
		scaleX: 0,
		originX: "95%",
		originY: "50%",
	},
};
