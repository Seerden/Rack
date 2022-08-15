import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Query all workouts (JOIN exercises) by `user_id`. */
export async function queryWorkoutsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: number }>) {
	if (typeof user_id !== "number") throw new Error("Invalid user_id");

	return sql<WorkoutWithExercises[]>`
      select sub.*
      from ( 
         select distinct(w.*), jsonb_agg(to_json(e.*)) exercises
         from workouts w 
         left join exercises e 
         on w.workout_id = e.workout_id 
         and w.user_id = ${user_id}
         group by w.workout_id
      ) sub
      where sub.user_id = ${user_id}
   `;
}

export async function queryWorkoutById({
	sql = sqlConnection,
	workout_id,
}: WithSQL<{ workout_id: ID }>) {
	if (typeof workout_id !== "number") throw new Error("Invalid workout_id");

	const [workout] = await sql<[WorkoutWithExercises]>`
   select sub.*
      from ( 
         select distinct(w.*), jsonb_agg(to_json(e.*)) exercises
         from workouts w 
         left join exercises e 
         on w.workout_id = e.workout_id 
         and w.workout_id = ${workout_id}
         group by w.workout_id
      ) sub
   `;

	return workout;
}
