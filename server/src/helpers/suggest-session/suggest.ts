import { Exercise } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import {
	SessionExercise,
	WorkoutSessionEntry,
} from "../../../types/shared/session.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";
import { getSessionsForWorkout } from "../../routers/exercise/query-sessions-for-workout";
import { queryWorkoutById } from "../../routers/exercise/query-workouts";
import { latestSessionForExercise } from "./parse-history";

/**
 * Given one exercise's most recent session, suggest a scheme (weight,
 * reps, sets) for the next session.
 */
export function suggestSchemeForExercise(
	exercise: Exercise,
	session: Maybe<WorkoutSessionEntry[]>
): SessionExercise {
	const { weight_progression, reps, sets, exercise_id, weight_unit, starting_weight } =
		exercise;

	const suggestedScheme: SessionExercise = {
		exercise_id,
		session: [{ exercise_id, reps, sets, weight_unit, weight: +starting_weight }],
	};

	if (!session || session.length === 0) {
		return suggestedScheme;
	}

	const setsCompleted = session.filter((s) => s.reps > 0).length;
	const repsInLastSet = session.at(-1)?.reps ?? 0; // TODO: does session.at(-1) do what we want -- is it sorted by date already?
	const lastWeight = +(session.at(-1)?.weight ?? starting_weight);

	if (setsCompleted < sets || repsInLastSet < reps) {
		suggestedScheme.session[0].weight = Math.round(0.9 * lastWeight); // TODO: refine this suggestion by allowing custom deload schemes
	} else {
		suggestedScheme.session[0].weight = lastWeight + +weight_progression;
	}

	return suggestedScheme;
}

/**
 * Query relevant data and suggest an ExerciseScheme for each exercise in a
 * workout.
 */
export async function suggestSchemeForWorkout({
	sql = sqlConnection,
	workout_id,
}: WithSQL<{ workout_id: ID }>) {
	const suggestedSession = await sql.begin(async (sql) => {
		const histories = await getSessionsForWorkout({ sql, workout_id });
		const exercises = (await queryWorkoutById({ sql, workout_id }))?.exercises;

		if (!exercises?.length) return [];

		const suggestedSession = histories
			.map((exerciseHistory) => {
				const latestSession = latestSessionForExercise(exerciseHistory);

				const exercise = exercises.find(
					(e) => e.exercise_id === exerciseHistory.exercise_id
				);

				console.log({ exercise });
				if (!exercise) return;

				return suggestSchemeForExercise(exercise, latestSession?.entries);
			})
			.filter((exerciseSession) => exerciseSession !== undefined) as SessionExercise[];

		console.log({ suggestedSession });

		for (const { reps, sets, exercise_id, weight_unit, starting_weight } of exercises) {
			if (!suggestedSession.find((x) => x.exercise_id === exercise_id)) {
				const suggested: SessionExercise = {
					exercise_id,
					session: [
						{
							reps,
							sets,
							weight_unit,
							exercise_id,
							weight: +starting_weight,
						},
					],
				};

				suggestedSession.push(suggested);
			}
		}

		console.log(suggestedSession);

		return suggestedSession;
	});

	return suggestedSession;
}
