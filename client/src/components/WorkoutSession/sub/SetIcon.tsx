import * as S from "./SetIcon.style";

type SetIconProps = {
	failed?: boolean;
	passed?: boolean;
	size?: number;
};

export default function SetIcon({ failed, passed, size = 18 }: SetIconProps) {
	return (
		<svg width={size} height={size}>
			<S.Circle
				failed={failed}
				passed={passed}
				cx={size / 2}
				cy={size / 2}
				r={size / 2}
			/>
		</svg>
	);
}
