import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { activeWorkoutState } from "../../../components/WorkoutSession/state/workout-state";
import { Data } from "../../../types/fetch-data";
import { ID } from "../../../types/shared/id.types";
import { SessionExercise } from "../../../types/shared/session.types";
import { baseUrl } from "../fetch-constants";

async function querySuggestedWorkoutById(workout_id: ID) {
	return (
		await fetch(`${baseUrl}/exercise/workouts/${workout_id}/session/suggested`, {
			credentials: "include",
			method: "GET",
		})
	).json();
}

export function useQuerySuggestedWorkout(workout_id: ID) {
	const setActiveWorkout = useSetRecoilState(activeWorkoutState);

	return useQuery<Data<"suggested", SessionExercise[]>>(
		["suggested", workout_id],
		async () => querySuggestedWorkoutById(workout_id),
		{
			refetchOnWindowFocus: false,
			onSuccess: ({ suggested }) => {
				setActiveWorkout(suggested);
			},
		}
	);
}
