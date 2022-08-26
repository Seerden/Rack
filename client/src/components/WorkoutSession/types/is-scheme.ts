import { ExerciseScheme } from "../../../types/shared/session.types";

/** Typeguard that validates warmupScheme is fully valid. */
export function isScheme(scheme: Partial<ExerciseScheme>): scheme is ExerciseScheme {
	return (
		["exercise_id", "reps", "sets", "weight_unit"].every(
			(field: keyof ExerciseScheme) => !!scheme[field]
		) && typeof scheme.weight === "number"
	);
}
