import { ID } from "../../../types/shared/id.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Fetch all workout_session_entries for every `exercise` in a `workout` */
export async function getSessionEntriesForWorkout({
	sql = sqlConnection,
	workout_id,
}: WithSQL<{ workout_id: ID }>) {
	return await sql`
      select jsonb_agg(to_jsonb(wse.*)) entries, to_jsonb(e.*) exercise from workouts w 
      inner join workout_sessions ws on ws.workout_id = w.workout_id and w.workout_id = ${workout_id}
      inner join workout_session_entries wse on ws.workout_session_id = wse.workout_session_id
      inner join exercises e on e.exercise_id = wse.exercise_id
      group by e.exercise_id
   `;
}
