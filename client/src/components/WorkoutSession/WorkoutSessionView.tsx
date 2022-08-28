import useWorkoutSession from "./hooks/useWorkoutSession";
import WorkoutSession from "./WorkoutSession";

export default function WorkoutSessionView() {
	const props = useWorkoutSession();

	if (!props.workout?.exercises || !props.activeExercise) return <></>;

	return <WorkoutSession {...props} />;
}
