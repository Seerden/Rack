import { WeightUnit } from "./exercise.types";
import { ID } from "./id.types";

export type WorkoutSession = {
	workout_session_id: number;
	workout_id: ID;
	created_at: number;
	started_at: number;
	completed_at: number;
	duration: number;
};

export type WorkoutSessionEntry = {
	workout_id: ID;
	workout_entry_id: ID;
	exercise_id: ID;
	weight: number;
	weight_unit: WeightUnit;
	reps: number;
	failed?: boolean;
};
