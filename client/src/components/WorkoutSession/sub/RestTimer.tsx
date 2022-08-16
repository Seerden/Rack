import useRestTimer from "../hooks/useRestTimer";
import * as S from "./RestTimer.style";

const defaultRestMillis = 3 * 60 * 1000;

export default function RestTimer() {
	const { progressPercentage, millisElapsed, start, reset } = useRestTimer(
		defaultRestMillis,
		true
	);

	// SVG attributes -- TODO: put these somewhere else
	const size = 200;
	const dashes = 2 * Math.PI * 0.4 * size;
	const dashOffset = Math.max(0, ((100 - progressPercentage) / 100) * dashes);

	return (
		<S.SVG
			width={size}
			height={size}
			strokeDasharray={dashes}
			strokeDashoffset={dashOffset}
		>
			<S.Group>
				<S.Circle
					cx={size / 2}
					cy={size / 2}
					r={0.4 * size}
					fill="#eee"
					strokeWidth={Math.min(7, 1 + 6 * (progressPercentage / 100))}
					stroke={
						progressPercentage >= 100
							? "forestgreen"
							: `rgba(0,0,0, ${progressPercentage / 100})`
					}
					strokeLinecap="round"
				/>
				<S.Circle
					cx={size / 2}
					cy={size / 2}
					r={0.35 * size}
					fill="#f2f2f2"
					strokeWidth={0}
				/>

				<S.Text
					pastDue={progressPercentage >= 100}
					x={size / 2}
					y={0.5 * size}
					dominantBaseline="middle"
					textAnchor="middle"
				>
					{(millisElapsed / 1000).toFixed(0)}s
				</S.Text>
				<S.Text
					x={size / 2}
					y={0.65 * size}
					dominantBaseline="middle"
					textAnchor="middle"
				>
					({defaultRestMillis / 1000}s)
				</S.Text>
			</S.Group>
		</S.SVG>
	);
}
