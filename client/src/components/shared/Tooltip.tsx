import { MutableRefObject, PropsWithChildren, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useClickOutside } from "../../hooks/useClickOutside";
import * as S from "./Tooltip.style";

export default function Tooltip(props: PropsWithChildren<{ onClose?: () => void }>) {
	function handleKeydown(e: KeyboardEvent) {
		if (!(e.key === "Escape")) return;

		props.onClose?.();
	}

	const ref = useRef() as MutableRefObject<HTMLParagraphElement>;
	useClickOutside(ref, props.onClose);

	useEffect(() => {
		window.addEventListener("keydown", handleKeydown);

		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, []);

	return (
		<S.Tooltip>
			<S.Close onClick={() => props.onClose?.()}>
				<MdClose size={18} />
			</S.Close>
			<S.Text ref={ref}>{props.children}</S.Text>
		</S.Tooltip>
	);
}
