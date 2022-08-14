import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Query all workouts (JOIN exercises) by `user_id`. */
export async function queryWorkoutsByUser({
	sql = sqlConnection,
	user_id,
}: WithSQL<{ user_id: number }>) {
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
