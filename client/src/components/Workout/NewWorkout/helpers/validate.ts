import { NewExercise } from "../../../../types/shared/exercise.types";

function isValidNewWorkout() {
	return;
}

function isValidNewExercise(exercise: NewExercise) {
	const { exercise_name, reps, sets, starting_weight, weight_progression } = exercise;

	return (
		exercise_name.length &&
		reps > 0 &&
		sets > 0 &&
		starting_weight > 0 &&
		weight_progression > 0
	);
}
