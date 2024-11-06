import { useMutation } from "@tanstack/react-query";
import { WorkoutInput, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { baseUrl, postConfig } from "../fetch-constants";

export default function useCreateWorkout() {
	async function postWorkout(newWorkout: WorkoutInput) {
		return (
			await fetch(`${baseUrl}/exercise/workout`, {
				...postConfig,
				body: JSON.stringify({ newWorkout }),
			})
		).json();
	}

	return useMutation<WorkoutWithExercises, any, WorkoutInput>({
		mutationKey: ["post/workout"],
		mutationFn: async (newWorkout) => postWorkout(newWorkout),
	});
}
