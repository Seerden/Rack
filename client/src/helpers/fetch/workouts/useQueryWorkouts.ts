import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useAuth from "../../../hooks/useAuth";
import { Data } from "../../../types/fetch-data";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { baseUrl } from "../fetch-constants";

export default function useQueryWorkoutsByUser() {
	const client = useQueryClient();

	async function getWorkoutsByUser(user_id?: number) {
		if (!user_id) {
			return;
		}

		const response = await fetch(`${baseUrl}/exercise/workouts/user/${user_id}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();

		// Populate ['workout', workout_id] entries in the query cache on success.
		if (data?.workouts) {
			for (const workout of data.workouts) {
				client.setQueryData(["workout", workout.workout_id], workout);
			}
		}

		return data;
	}

	const { currentUser } = useAuth();
	const queryFn = useCallback(
		() => getWorkoutsByUser(currentUser?.user_id),
		[currentUser]
	);

	return useQuery<Data<"workouts", WorkoutWithExercises[]>>({
		queryKey: ["workouts"],
		queryFn,
		enabled: !!currentUser?.user_id,
	});
}
