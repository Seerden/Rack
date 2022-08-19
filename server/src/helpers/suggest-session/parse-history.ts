import { ID } from "../../../types/shared/id.types";
import { HistoryList } from "../../../types/shared/session.types";

/**
 * Extract the history of one exercise from a list of histories (returned from
 * `getSessionsForWorkout()`).
 */
export function extractSessionsForExercise(exercise_id: ID, histories: HistoryList) {
	return histories.find((entry) => entry.exercise_id === exercise_id);
}

/**
 * Given one exercise's history (obtained through
 * extractSessionsForExercise()), extract the most recent session.
 */
export function latestSessionForExercise({ history }: HistoryList[number]) {
	return history.sort((a, b) => a.workout_session_id - b.workout_session_id).at(-1);
}
