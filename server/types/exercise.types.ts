export type NewWorkout = {
   name: string;
   description?: string;
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
   starting_weight: number;
   weight_progression: number;
   weight_unit: WEIGHT_UNITS;
};

/** Matches type of `exercises` table. */
export type Exercise = NewExercise & {
   exercise_id: number;
   workout_id: number;
};

/** This is the expected type of the object coming from the client. */
export type WorkoutInput = NewWorkout & {
   exercises: NewExercise[];
};
