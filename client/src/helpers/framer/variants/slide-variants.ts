import { Transition, Variants } from "framer-motion";

export const slideBounceVariants: Variants & Transition = {
	initial: { y: "-100%", opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { opacity: 0 },
	transition: {
		type: "spring",
		duration: 0.45,
		bounce: 0.2,
	},
};

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
		color: "rgba(0,0,0,0)",
		scaleX: 0,
		originX: "95%",
		originY: "50%",
	},
	animate: {
		color: "black",
		scaleX: 1,
	},
	exit: {
		color: "rgba(0,0,0,0)",
		scaleX: 0,
		originX: "95%",
		originY: "50%",
	},
};

export const minimalSlideVariants: Variants = {
	initial: {
		x: "-15%",
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
	},
	exit: {
		color: "rgba(0,0,0,0)",
		backgroundColor: "rgba(0,0,0,0)",
		opacity: 0,
		transition: {
			duration: 0.25,
		},
	},
};
