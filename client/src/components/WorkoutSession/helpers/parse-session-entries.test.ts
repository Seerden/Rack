import { WeightUnit, WEIGHT_UNITS } from "../../../types/shared/exercise.types";
import {
	SessionExercise,
	WorkoutSessionEntryInput,
} from "../../../types/shared/session.types";
import { SessionEntriesInput } from "../types/workout-state.types";
import { parseSessionEntries } from "./parse-session-entries";

describe("parseSessionEntries", () => {
	const entries: SessionEntriesInput = {
		1: {
			"20": [
				{
					reps: 5,
					timestamp: new Date(1),
				},
				{
					reps: 4,
					timestamp: new Date(2),
				},
				{
					reps: 3,
					timestamp: new Date(3),
				},
			],
		},
	};

	const weight_unit: WeightUnit = "kg";

	const session: SessionExercise[] = [
		{
			exercise_id: 1,
			schemes: [
				{
					exercise_id: 1,
					reps: 5,
					sets: 3,
					weight: 20,
					weight_unit: WEIGHT_UNITS.KG,
					is_warmup: false,
				},
			],
		},
	];

	const result: WorkoutSessionEntryInput[] = [
		{
			exercise_id: 1,
			created_at: new Date(1),
			reps: 5,
			weight: 20,
			weight_unit: WEIGHT_UNITS.KG,
			failed: false,
		},
		{
			exercise_id: 1,
			created_at: new Date(2),
			reps: 4,
			weight: 20,
			weight_unit: WEIGHT_UNITS.KG,
			failed: true,
		},
		{
			exercise_id: 1,
			created_at: new Date(3),
			reps: 3,
			weight: 20,
			weight_unit: WEIGHT_UNITS.KG,
			failed: true,
		},
	];

	expect(parseSessionEntries(entries, weight_unit, session)).toEqual(result);
});
