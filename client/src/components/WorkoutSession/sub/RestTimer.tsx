import { BiReset } from "react-icons/bi";
import { MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";
import useRestTimer from "../hooks/useRestTimer";
import * as S from "./RestTimer.style";

const defaultRestMillis = 3 * 60 * 1000;

export default function RestTimer() {
	const { progressPercentage, millisElapsed, reset, on, toggle } = useRestTimer(
		defaultRestMillis,
		true
	);

	const TimerToggleSVG = on ? MdOutlineTimerOff : MdOutlineTimer;

	// SVG attributes -- TODO: put these somewhere else
	const size = 200;
	const radius = 0.45 * size;
	const dashes = 2 * Math.PI * radius;
	const dashOffset = Math.max(0, ((100 - progressPercentage) / 100) * dashes);

	return (
		<S.Wrapper>
			<S.TimerButton
				stopped={!on}
				title={on ? "Stop timer" : "Start timer"}
				onClick={(e) => {
					e.preventDefault();
					toggle();
				}}
			>
				<TimerToggleSVG aria-hidden="true" size={21} />
			</S.TimerButton>
			<S.SVG
				width={size}
				height={size}
				strokeDasharray={dashes}
				strokeDashoffset={dashOffset}
			>
				<S.Group>
					<title>Rest timer is currently {!on && "not"} active</title>
					<S.Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill={on ? "#eee" : "orangered"}
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
						r={0.4 * size}
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
			<S.TimerButton
				title="End rest period"
				onClick={(e) => {
					e.preventDefault();
					reset();
				}}
			>
				<BiReset
					aria-hidden="true"
					size={21}
					style={{
						alignSelf: "center",
					}}
				/>
			</S.TimerButton>
		</S.Wrapper>
	);
}
