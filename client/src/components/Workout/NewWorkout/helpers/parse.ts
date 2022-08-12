import { WeightUnit } from "../../../../types/exercise.types";
import { NewExercise, WorkoutInput } from "../../../../types/server/exercise.types";
import { RawNewWorkout } from "../state/new-workout-state";

/**
 * The NewWorkout/NewExercise form component combination results in a
 * newWorkout shape slightly different to WorkoutInput. Use this helper to parse
 * the form output to WorkoutInput by assigning weight_unit values to all
 * exerciisesn the workout. */
export function parseNewWorkout(
	newWorkout: RawNewWorkout,
	weight_unit: WeightUnit
): WorkoutInput {
	const exercises = structuredClone(newWorkout.exercises);

	const exercisesWithUnit = exercises.map((e) => ({
		...e,
		weight_unit,
	})) as NewExercise[];

	return { ...newWorkout, exercises: exercisesWithUnit };
}
