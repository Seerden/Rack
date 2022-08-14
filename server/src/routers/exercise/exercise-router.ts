import { Router } from "express";
import { WorkoutInput } from "../../../types/shared/exercise.types";
import { createWorkout } from "./create-workout";
import { queryWorkoutsByUser } from "./query-workouts";

export const exerciseRouter = Router({ mergeParams: true });

exerciseRouter.post("/workout", async (req, res) => {
	const newWorkout: WorkoutInput = req.body?.newWorkout;

	// @ts-ignore -- FIXME: temporarily using static user_id since we don't have session authentication yet
	const user_id = req.session?.user_id ?? 1;

	const workoutWithExercises = await createWorkout({ newWorkout, user_id });

	res.json(workoutWithExercises);
});

exerciseRouter.get("/workouts/user/:user_id/", async (req, res) => {
	// TODO: any user can get data for any user like this. Make sure to implement
	// `protected` middleware before pushing this live.
	const user_id = +req.params.user_id;

	res.json({ workouts: await queryWorkoutsByUser({ user_id }) });
});
