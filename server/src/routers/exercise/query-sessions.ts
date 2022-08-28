import { ID } from "../../../types/shared/id.types";
import { ExerciseWithEntries } from "../../../types/shared/session.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/** Fetch all workout_session_entries for every `exercise` in a `workout` */
export async function getSessionEntriesForWorkout({
	sql = sqlConnection,
	workout_id,
}: WithSQL<{ workout_id: ID }>) {
	return await sql`
      select jsonb_agg(distinct wse.*) entries, jsonb_agg(distinct e.*) exercises, w.*
         from workout_session_entries wse
         inner join workout_sessions ws
            on wse.workout_session_id = ws.workout_session_id
         inner join workouts w
            on w.workout_id = ${workout_id}
            and ws.workout_id = w.workout_id
         inner join exercises e
            on e.exercise_id = wse.exercise_id
         group by w.workout_id
   `;
}

/** Query all `workout_session_entries` rows for an exercise by `exercise_id`. */
export async function getSessionEntriesForExercise({
	sql = sqlConnection,
	exercise_id,
}: WithSQL<{ exercise_id: ID }>) {
	return (
		await sql<[ExerciseWithEntries]>`
   select jsonb_agg(to_json(wse.*)) entries, e.* exercise
   from workout_session_entries wse
      inner join exercises e 
      on e.exercise_id = wse.exercise_id
      and e.exercise_id = ${exercise_id}
   group by e.exercise_id
`
	)[0];
}

/** Query all `workout_session_entries` rows for an exercise by `exercise_id`. */
export async function getSessionEntriesForExercises({
	sql = sqlConnection,
	exerciseIds,
}: WithSQL<{ exerciseIds: ID[] }>) {
	return await sql<[ExerciseWithEntries]>`
   select jsonb_agg(to_json(wse.*)) entries, e.* exercise
   from workout_session_entries wse
      inner join exercises e 
      on e.exercise_id = wse.exercise_id
      and e.exercise_id = any(${exerciseIds})
   group by e.exercise_id
`;
}
