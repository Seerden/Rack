import { FaInfo } from "react-icons/fa";
import * as S from "./Info.style";

export type InfoProps = {
	title?: string;
	onClick?: () => void;
};

export default function Info({ onClick, title = "What is this?" }: InfoProps) {
	return (
		<S.Info
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick?.();
			}}
		>
			<FaInfo title={title} size={17} />
		</S.Info>
	);
}
