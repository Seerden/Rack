import { MutableRefObject, useCallback, useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	ref: MutableRefObject<T>,
	handler?: () => void
) {
	const clickOutsideHandler = useCallback(
		(e: MouseEvent) => {
			// NOTE: e.button === 0 for left clicks. We don't want to call the
			// handler on right-click, hence the condition.
			if (!e.button && ref.current && !ref.current.contains(e.target as Node))
				handler?.();
		},
		[ref.current, handler]
	);

	useEffect(() => {
		window.addEventListener("mousedown", clickOutsideHandler);
		return () => window.removeEventListener("mousedown", clickOutsideHandler);
	}, []);
}
