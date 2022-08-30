import { NewExercise, WorkoutInput } from "../../../../types/shared/exercise.types";

export function isValidNewWorkout(workout: WorkoutInput) {
	const { exercises, name } = workout;

	return (
		name?.length > 0 &&
		exercises.length > 0 &&
		exercises.every((e) => isValidNewExercise(e))
	);
}

export function isValidNewExercise(
	exercise: NewExercise | Omit<NewExercise, "weight_unit">
) {
	const { exercise_name, reps, sets, starting_weight, weight_progression } = exercise;

	return (
		exercise_name?.length > 0 &&
		reps > 0 &&
		sets > 0 &&
		starting_weight > 0 &&
		weight_progression > 0
	);
}
