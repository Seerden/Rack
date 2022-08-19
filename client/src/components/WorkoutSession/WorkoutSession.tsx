import { Title } from "../../helpers/theme/snippets/Title";
import useWorkoutSession from "./hooks/useWorkoutSession";
import ActiveExercise from "./sub/ActiveExercise";
import RestTimer from "./sub/RestTimer";
import SessionLog from "./sub/SessionLog";
import * as S from "./WorkoutSession.style";

export default function WorkoutSession() {
	const {
		workout,
		activeExercise,
		setActiveExerciseId,
		activeExerciseId,
		cycleActiveIndex,
		allCompleted,
	} = useWorkoutSession();

	if (!workout?.exercises || !activeExercise) return <></>;

	return (
		<S.Page>
			<Title>{workout?.name} session</Title>

			<RestTimer />

			<SessionLog
				workout={workout}
				onClick={setActiveExerciseId}
				activeExerciseId={activeExerciseId ?? 0}
			/>

			{allCompleted && (
				<div>
					You've done all your working sets! Are you ready to end this session?
				</div>
			)}

			{!allCompleted && activeExercise && (
				<ActiveExercise
					cycleIndex={cycleActiveIndex}
					e={activeExercise}
					// TODO: consider adding weight_unit to workout in addition to
					// including it in each exercise
					weight_unit={workout.exercises[0].weight_unit}
				/>
			)}
		</S.Page>
	);
}
