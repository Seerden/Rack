import { NewExercise } from "../../../types/shared/exercise.types";

export function newExercisesWithWorkoutId(workout_id: number, exercises: NewExercise[]) {
   return exercises.map((e): NewExercise & { workout_id: number } => ({
      ...e,
      workout_id,
   }));
}
