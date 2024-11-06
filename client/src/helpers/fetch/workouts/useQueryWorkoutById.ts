import { useQuery } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import { baseUrl } from "../fetch-constants";

export function useQueryWorkoutById(workout_id: ID) {
	async function getWorkoutById(workout_id: ID) {
		return (
			await fetch(`${baseUrl}/exercise/workouts/id/${workout_id}`, {
				method: "GET",
				credentials: "include",
			})
		).json();
	}

	return useQuery<Data<"workout", WorkoutWithExercises>>({
		queryKey: ["workout", workout_id],
		queryFn: () => getWorkoutById(workout_id),
	});
}
