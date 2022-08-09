import {
   Exercise,
   NewWorkout,
   Workout,
   WorkoutInput,
   WorkoutWithExercises,
} from "../../../types/exercise.types";
import { WithSQL } from "../../../types/sql.types";
import { WithUserId } from "../../../types/user.types";
import { sqlConnection } from "../../db/init";
import { newExercisesWithWorkoutId } from "./exercises-with-ids";

/** INSERT query for a single NewWorkout. */
// TODO: extract to db query folder somewhere
export async function insertWorkout({
   sql = sqlConnection,
   workoutWithUser,
}: WithSQL<{ workoutWithUser: WithUserId<NewWorkout> }>) {
   // Casting to any is much easier than filtering all possible nullish values
   // just to stop the postgres type from complaining.
   return sql<[Workout]>`
      insert into workouts ${sql(workoutWithUser as any)} 
      returning *
   `;
}

/** INSERT query for any number of exercises. */
export async function insertExercises({
   sql = sqlConnection,
   exercisesWithIds,
}: WithSQL<{ exercisesWithIds: Array<Omit<Exercise, "exercise_id">> }>) {
   return sql<[Exercise]>`
      insert into exercises ${sql(exercisesWithIds)} 
      returning *
   `;
}

/** Helper function to validate a NewWorkout and handle database insertion with `insertWorkout()`. */
export async function createWorkout({
   sql = sqlConnection,
   newWorkout,
   user_id,
}: WithUserId<WithSQL<{ newWorkout: WorkoutInput }>>) {
   if (!user_id) throw Error("createWorkout requires a user_id parameter");

   const { exercises, ...workout } = newWorkout;
   const workoutWithUser = { ...workout, user_id };

   return sql.begin(async (sql): Promise<WorkoutWithExercises> => {
      const [insertedWorkout] = await insertWorkout({ sql, workoutWithUser });

      const insertedExercises = await insertExercises({
         sql,
         exercisesWithIds: newExercisesWithWorkoutId(
            insertedWorkout.workout_id,
            exercises
         ),
      });

      return { ...insertedWorkout, exercises: insertedExercises };
   });
}
