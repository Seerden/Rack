import { ID } from "../../../types/shared/id.types";
import { HistoryList } from "../../../types/shared/session.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/**
 * Query the session histories for all exercises of a workout, and group them by
 * exercise, and by workout session.
 */
export async function getSessionsForWorkout({
	sql = sqlConnection,
	workout_id,
}: WithSQL<{ workout_id: ID }>) {
	return sql<HistoryList>`
      select exercise_id, jsonb_agg(sub.*) history from (
         select 
            wse.exercise_id, 
            wse.workout_session_id,
            jsonb_agg(wse.*) entries
         from workout_session_entries wse
            inner join workout_sessions ws
               on wse.workout_session_id = ws.workout_session_id
            inner join workouts w
               on w.workout_id = ws.workout_id
               and w.workout_id = ${workout_id}
         group by wse.exercise_id, wse.workout_session_id
      ) sub group by sub.exercise_id;
   `;
}
