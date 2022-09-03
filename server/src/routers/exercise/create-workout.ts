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
	workout_id,
	exercises,
}: WithSQL<{
	workout_id: ID;
	exercises: Array<number | Omit<Exercise, "exercise_id">>;
}>) {
	const newExercises = exercises.filter((e) => typeof e !== "number") as Array<
		Omit<Exercise, "exercise_id">
	>;
	const existingExercises = exercises.filter((e) => typeof e === "number") as ID[];

	const insertedExercises = await sql<[Exercise]>`
         insert into exercises ${sql(newExercises)} 
         returning *
      `;

	// Build rows to insert into `workout_exercises` table.
	const mappedIds = insertedExercises
		.map((e) => e.exercise_id)
		.concat(existingExercises)
		.map((exercise_id) => ({
			exercise_id,
			workout_id,
		}));

	const exerciseIds: number[] = [];

	// inserting in a loop because a multi-insert query with 'where exists' is
	// too finicky for me atm -- see https://stackoverflow.com/questions/24769157/insert-multiple-rows-where-not-exists-postgresql
	// for a 'proper' implementation
	for (const { workout_id: w_id, exercise_id: e_id } of mappedIds) {
		const [{ exercise_id }] = await sql<[{ exercise_id: number }]>`
            insert into workout_exercises(exercise_id, workout_id) select ${e_id}, ${w_id}
               where exists (select * from exercises e where e.exercise_id = ${e_id})
               and exists (select * from workouts w where w.workout_id = ${w_id})
            returning exercise_id
         `;
		exerciseIds.push(exercise_id);
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

	const { exercises, ...workout } = newWorkout;
	const workoutWithUser = { ...workout, user_id };

	return sql.begin(async (q): Promise<WorkoutWithExercises> => {
		const [insertedWorkout] = await insertWorkout({ sql: q, workoutWithUser });

		const insertedExerciseIds = await insertExercises({
			sql: q,
			workout_id: insertedWorkout.workout_id,
			exercises,
		});

		const insertedExercises = await q<
			Exercise[]
		>`select * from exercises where exercise_id in ${sql(insertedExerciseIds)}`;

		return { ...insertedWorkout, exercises: insertedExercises };
	});
}
