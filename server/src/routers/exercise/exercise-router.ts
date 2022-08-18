import { Router } from "express";
import { WorkoutInput } from "../../../types/shared/exercise.types";
import { insertWorkoutSession } from "./create-session";
import { createWorkout } from "./create-workout";
import { getSessionEntriesForExercise } from "./query-sessions";
import { getSessionsForWorkout } from "./query-sessions-for-workout";
import { queryWorkoutById, queryWorkoutsByUser } from "./query-workouts";

export const exerciseRouter = Router({ mergeParams: true });

exerciseRouter.post("/workout", async (req, res) => {
	const newWorkout: WorkoutInput = req.body?.newWorkout;

	const user_id = req.session?.user_id;

	// TODO: once we wrap the route in an authentication middleware, this check
	// becomes obsolete.
	if (!user_id) {
		return res.status(401).json({ message: "Not authorized." });
	}

	const workoutWithExercises = await createWorkout({ newWorkout, user_id });

	res.json(workoutWithExercises);
});

exerciseRouter.get("/workouts/user/:user_id/", async (req, res) => {
	// TODO: any user can get data for any user like this. Make sure to implement
	// `protected` middleware before pushing this live.
	const user_id = +req.params.user_id;

	res.json({ workouts: await queryWorkoutsByUser({ user_id }) });
});

exerciseRouter.get("/workouts/id/:workout_id", async (req, res) => {
	const workout_id = +req.params.workout_id;

	res.json({ workout: await queryWorkoutById({ workout_id }) });
});

exerciseRouter.post("/workouts/session", async (req, res) => {
	const { newWorkoutSession } = req.body;

	// TODO: type-guard `newWorkoutSession`

	res.json(await insertWorkoutSession({ sessionWithEntries: newWorkoutSession }));
});

// TODO: WIP
exerciseRouter.get("/workouts/:workout_id/session/suggested", async (req, res) => {
	const workout_id = +req.params.workout_id;

   // TODO: finalize implementation of getSessionsForWorkout()
   const histories = await getSessionsForWorkout({});
   const suggestedSession = histories.map(exerciseHistory => {
      const entries = exerciseHistory.history.sort((a, b) => a.workout_session_id - b.workout_session_id);
      const lastSession = entries.at(-1);

      if (!lastSession) {
         // suggest using starting weight
      }

      if (/* failed last session */) {
         // suggest deload
      }

      // suggest progression using weight_progression
   })
});

exerciseRouter.get("/workouts/exercise/:exerciseId/entries", async (req, res) => {
	const exerciseId = +req.params.exerciseId;

	res.json(await getSessionEntriesForExercise({ exercise_id: exerciseId }));
});
