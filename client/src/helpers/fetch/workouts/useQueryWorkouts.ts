import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Data } from "../../../types/fetch-data";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { baseUrl } from "../fetch-constants";

async function getWorkoutsByUser(user_id?: number) {
	if (!user_id) return;

	return (
		await fetch(`${baseUrl}/exercise/workouts/user/${user_id}`, {
			method: "GET",
			credentials: "include",
		})
	).json();
}

export default function useQueryWorkoutsByUser() {
	const { currentUser } = useAuth();
	const client = useQueryClient();

	return useQuery<Data<"workouts", WorkoutWithExercises[]>>(
		["workouts"],
		async () => getWorkoutsByUser(currentUser?.user_id),
		{
			// Populate ['workout', workout_id] entries in the query cache on success.
			onSuccess: ({ workouts }) => {
				if (!workouts.length) return;

				for (const workout of workouts) {
					client.setQueryData(["workout", workout.workout_id], workout);
				}
			},
			enabled: !!currentUser?.user_id,
		}
	);
}
