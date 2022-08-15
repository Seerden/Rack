import { useQuery } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import { baseUrl } from "../fetch-constants";

async function getWorkoutById(workout_id: ID) {
	return (
		await fetch(`${baseUrl}/exercise/workouts/id/${workout_id}`, {
			method: "GET",
			credentials: "include",
		})
	).json();
}

export function useQueryWorkoutById(workout_id: ID) {
	return useQuery<Data<"workout", WorkoutWithExercises>>(
		["workout", workout_id],
		async () => getWorkoutById(workout_id)
	);
}
