import { Exercise, WeightUnit } from "./exercise.types";
import { ID } from "./id.types";

export type WorkoutSessionInput = {
	workout_id: ID;
	created_at: Date;
	started_at: Date;
	completed_at: Date;
};

/** Matches database model */
export type WorkoutSession = WorkoutSessionInput & {
	workout_session_id: number;
	duration: number; // this is auto-generated at the database level on insertion
};

export type WorkoutSessionEntryInput = {
	exercise_id: ID;
	weight: number;
	weight_unit: WeightUnit;
	reps: number;
	created_at: Date;
	failed?: boolean;
};

/** Matches database model */
export type WorkoutSessionEntry = WorkoutSessionEntryInput & {
	workout_session_id: ID;
	workout_entry_id: ID;
};

// Type as expected to be passed from client -> server
export type WorkoutSessionWithEntriesInput = WorkoutSessionInput & {
	entries: WorkoutSessionEntryInput[];
};

/** Expected return type from POST `exercise/workout` */
export type WorkoutSessionWithEntries = WorkoutSession & {
	entries: WorkoutSessionEntry[];
};

export type ExerciseWithEntries = Exercise & { entries: WorkoutSessionEntry[] };

export type ExerciseScheme = Pick<
	Exercise,
	"exercise_id" | "reps" | "sets" | "weight_unit"
> & { weight: number };

export type HistoryList = [
	{
		exercise_id: number;
		history: Array<{
			workout_session_id: number;
			exercise_id: number;
			entries: WorkoutSessionEntry[];
		}>;
	}
];
