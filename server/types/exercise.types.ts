export type NewWorkout = {
   name: string;
   description?: string;
};

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

export type Exercise = NewExercise & {
   exercise_id: number;
   workout_id: number;
};
