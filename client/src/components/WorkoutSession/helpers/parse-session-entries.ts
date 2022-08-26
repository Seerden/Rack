import { WeightUnit } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import {
	SessionExercise,
	WorkoutSessionEntryInput,
} from "../../../types/shared/session.types";
import { SessionEntriesInput } from "../types/workout-state.types";

/** Parse workout session state to a list of session entries. */
export function parseSessionEntries(
	entries: SessionEntriesInput,
	weight_unit: WeightUnit,
	session: SessionExercise[]
): WorkoutSessionEntryInput[] {
	const exerciseIds = Object.keys(entries).map((x) => +x) as ID[];

	const parsedEntries: WorkoutSessionEntryInput[] = [];

	for (const id of exerciseIds) {
		const performedSchemes = entries[id];
		if (!performedSchemes) continue;

		const weightsUsed = Object.keys(performedSchemes);

		for (const weight of weightsUsed) {
			const scheme = performedSchemes[weight];

			if (!scheme) continue;

			const thisExerciseInSession = session.find((x) => x.exercise_id === id);
			const thisWeightScheme = thisExerciseInSession?.schemes.find(
				(x) => x.weight === +weight
			);
			const repTarget = thisWeightScheme?.reps;

			if (!repTarget) continue;

			const entriesForWeightForExercise: WorkoutSessionEntryInput[] = scheme.map(
				(s) => ({
					created_at: s.timestamp,
					reps: s.reps,
					exercise_id: id,
					weight: +weight,
					weight_unit,
					failed: s.reps < repTarget,
				})
			);

			parsedEntries.push(...entriesForWeightForExercise);
		}
	}

	return parsedEntries;
}
