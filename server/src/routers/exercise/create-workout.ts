import {
	Exercise,
	NewWorkout,
	Workout,
	WorkoutInput,
	WorkoutWithExercises,
} from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import { WithUserId } from "../../../types/shared/user.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";

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

/**
 * INSERT query for any number of exercises.
 * NOTE: when run stand-alone, we have to wrap this function in a transaction
 * (await sql.begin(q => {...})). But since this is currently only run from
 * inside a transaction (in createWorkout), we don't have to do this here.
 * */
export async function insertExercises({
	sql = sqlConnection,
	exercises,
}: WithSQL<{
	exercises: Array<Omit<Exercise, "exercise_id">>;
}>) {
	return await sql<[Exercise]>`
      insert into exercises ${sql(exercises)} 
      returning exercise_id
   `;
}

async function insertWorkoutExerciseRelations({
	sql = sqlConnection,
	mappedIds,
}: WithSQL<{ mappedIds: { workout_id: ID; exercise_id: ID }[] }>) {
	const exerciseIds: number[] = [];
	// Multi-inserting in 1 query is too tricky for me right now. For a proper
	// implementation, see the following link:
	// https://stackoverflow.com/questions/24769157/insert-multiple-rows-where-not-exists-postgresql
	for (const { workout_id: w_id, exercise_id: e_id } of mappedIds) {
		const added = await sql<[{ exercise_id: number }]>`
      insert into workout_exercises(exercise_id, workout_id) select ${e_id}, ${w_id}
         where exists (select * from exercises e where e.exercise_id = ${e_id})
         and exists (select * from workouts w where w.workout_id = ${w_id})
      returning exercise_id
   `;
		exerciseIds.push(...added.map((a) => a.exercise_id));
	}

	return exerciseIds;
}

/** Helper function to validate a NewWorkout and handle database insertion with `insertWorkout()`. */
export async function createWorkout({
	sql = sqlConnection,
	newWorkout,
	user_id,
}: WithUserId<WithSQL<{ newWorkout: WorkoutInput }>>) {
	if (!user_id) throw Error("createWorkout requires a user_id parameter");

	const { exercises, sharedExercises, ...workout } = newWorkout;
	const workoutWithUser = { ...workout, user_id };
	const exercisesWithUser: Omit<Exercise, "exercise_id">[] = exercises.map((e) => ({
		...e,
		user_id,
	}));

	return sql.begin(async (q): Promise<WorkoutWithExercises> => {
		const [insertedWorkout] = await insertWorkout({ sql: q, workoutWithUser });

		const insertedExerciseIds = (
			await insertExercises({
				sql: q,
				exercises: exercisesWithUser,
			})
		).map((e) => e.exercise_id);

		const insertedExercises = await q<Exercise[]>`
         select * from exercises where exercise_id in ${sql(insertedExerciseIds)}
      `;

		// Build rows to insert into `workout_exercises` table.
		const mappedIds = insertedExercises
			.map((e) => e.exercise_id)
			.concat(sharedExercises)
			.map((exercise_id) => ({
				exercise_id,
				workout_id: insertedWorkout.workout_id,
			}));

		const exerciseIds = await insertWorkoutExerciseRelations({ sql: q, mappedIds });

		const allExercises = await q<[Exercise]>`
         select * from exercises where exercise_id in ${sql(exerciseIds)}
      `;

		return { ...insertedWorkout, exercises: allExercises };
	});
}
