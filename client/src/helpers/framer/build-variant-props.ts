import { VariantLabels, Variants } from "framer-motion";

type DefaultVariantLabel = "initial" | "animate" | "exit";

type DefaultVariants = { variants: Variants } & {
	[k in DefaultVariantLabel]: VariantLabels;
};

/** Animations that aren't too involved will typically be passed to a component
 * using just the `variants`, `initial`, `animate` and `exit` props. This
 * function takes a parameter `variants` and appends "initial", "animate" and
 * "exit" props. Use this only when the given `variants` doesn't use variant
 * labels other than these three pre-defined ones. */
export function makeDefaultVariantProps(variants: Variants): DefaultVariants {
	return {
		variants,
		initial: "initial",
		animate: "animate",
		exit: "exit",
	} as const;
}
