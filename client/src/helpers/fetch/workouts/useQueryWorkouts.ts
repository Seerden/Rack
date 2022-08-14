import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Data } from "../../../types/fetch-data";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { baseUrl } from "../fetch-constants";

async function getWorkoutsByUser(user_id?: number) {
	if (!user_id) return;

	// TODO: add options (method, credentials)
	return (await fetch(`${baseUrl}/exercise/workouts/user/${user_id}`)).json();
}

export default function useQueryWorkoutsByUser() {
	const { currentUser } = useAuth();

	return useQuery<Data<"workouts", WorkoutWithExercises[]>>(["workouts"], async () =>
		getWorkoutsByUser(currentUser?.user_id)
	);
}
