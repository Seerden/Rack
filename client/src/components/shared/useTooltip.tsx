import { useState } from "react";

/** TODO: consider coupling this to a Tooltip component, see issue #25. */
export default function useTooltip(initialOpen = false) {
	const [showTooltip, setShowTooltip] = useState(initialOpen);

	const openTooltip = () => setShowTooltip(true);
	const closeTooltip = () => setShowTooltip(false);

	return {
		show: showTooltip,
		open: openTooltip,
		close: closeTooltip,
	} as const;
}
