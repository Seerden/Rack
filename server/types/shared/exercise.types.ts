import { ID } from "./id.types";

export type WeightUnit = "kg" | "lbs";

export type NewWorkout = {
	name: string;
	description?: string;
	weight_unit: WeightUnit;
};

/** Matches type of `workouts` table. */
export type Workout = NewWorkout & {
	workout_id: number;
	user_id: number;
};

export enum WEIGHT_UNITS {
	KG = "kg",
	LBS = "lbs",
}

export type NewExercise = {
	exercise_name: string;
	sets: number;
	reps: number;
	starting_weight: string | number;
	weight_progression: string | number;
	weight_unit: WeightUnit;
};

/** Matches type of `exercises` table. */
export type Exercise = NewExercise & {
	exercise_id: number;
};

/** This is the expected type of the object coming from the client. */
export type WorkoutInput = NewWorkout & {
	exercises: Array<NewExercise>;
	sharedExercises: ID[];
};

export type WorkoutWithExercises = Workout & { exercises: Exercise[] };
