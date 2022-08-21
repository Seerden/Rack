import { useEffect, useMemo, useState } from "react";

export default function useRestTimer(targetMillis: number, initialOn?: boolean) {
	const [on, setOn] = useState<boolean>(initialOn ?? false);
	const [delay, setDelay] = useState<number>(17); // Millisecond update interval -- ~17ms translates to 60fps
	const [millisElapsed, setMillisElapsed] = useState<number>(0);
	const reset = () => setMillisElapsed(0);
	const start = () => setOn(true);
	const stop = () => setOn(false);
	const toggle = () => setOn((on) => !on);
	const progressPercentage = useMemo(
		() => +((100 * millisElapsed) / targetMillis).toFixed(1),
		[millisElapsed]
	);

	useEffect(() => {
		if (!on) return;

		const id = setInterval(() => {
			setMillisElapsed((cur) => cur + delay);
		}, delay);

		return () => clearInterval(id);
	}, [delay, on]);

	return {
		progressPercentage,
		millisElapsed,
		setDelay,
		start,
		stop,
		reset,
		toggle,
		on,
	} as const;
}
