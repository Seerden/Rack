import { useMutation } from "@tanstack/react-query";
import { WorkoutInput, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { baseUrl, postConfig } from "../fetch-constants";

async function postWorkout(newWorkout: WorkoutInput) {
	return (
		await fetch(`${baseUrl}/exercise/workout`, {
			...postConfig,
			body: JSON.stringify({ newWorkout }),
		})
	).json();
}

export default function useCreateWorkout() {
	return useMutation<WorkoutWithExercises, any, WorkoutInput>(
		["post/workout"],
		async (newWorkout) => postWorkout(newWorkout)
	);
}
