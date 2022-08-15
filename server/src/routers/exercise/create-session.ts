import {
	WorkoutSession,
	WorkoutSessionEntry,
	WorkoutSessionWithEntries,
	WorkoutSessionWithEntriesInput,
} from "../../../types/shared/session.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

/**
 * Insert a `workout_session` row and descendant `workout_session_entries` rows,
 * and return both the session and entries.
 */
export async function insertWorkoutSession({
	sql = sqlConnection,
	sessionWithEntries,
}: WithSQL<{
	sessionWithEntries: WorkoutSessionWithEntriesInput;
}>): Promise<WorkoutSessionWithEntries> {
	return sql.begin(async (sql) => {
		const { entries, ...session } = sessionWithEntries;

		const [insertedSession] = await sql<[WorkoutSession]>`
         insert into workout_sessions ${sql(session)} returning *
      `;

		const entriesWithSessionId: Omit<WorkoutSessionEntry, "workout_entry_id">[] =
			entries.map((e) => ({
				...e,
				workout_session_id: insertedSession.workout_session_id,
			}));

		const insertedEntries = await sql<[WorkoutSessionEntry]>`
         insert into workout_session_entries ${sql(
				entriesWithSessionId as any
			)} returning *
      `;

		return { ...insertedSession, entries: insertedEntries };
	});
}
