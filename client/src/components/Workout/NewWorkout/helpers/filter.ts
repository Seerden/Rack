import { NewExercise } from "../../../../types/shared/exercise.types";
import { isValidNewExercise } from "./validate";

export function filterValidExercises(exercises: NewExercise[]) {
	return exercises.filter((e) => isValidNewExercise(e));
}
