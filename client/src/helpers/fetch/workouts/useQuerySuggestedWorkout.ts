import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { activeWorkoutState } from "../../../components/WorkoutSession/state/workout-state";
import { Data } from "../../../types/fetch-data";
import { ID } from "../../../types/shared/id.types";
import { SessionExercise } from "../../../types/shared/session.types";
import { baseUrl } from "../fetch-constants";

export function useQuerySuggestedWorkout(workout_id: ID) {
	async function querySuggestedWorkoutById(workout_id: ID) {
		const response = await fetch(
			`${baseUrl}/exercise/workouts/${workout_id}/session/suggested`,
			{
				credentials: "include",
				method: "GET",
			}
		);
		const data = await response.json();

		const setActiveWorkout = useSetRecoilState(activeWorkoutState);
		if (data.suggested) {
			setActiveWorkout(data.suggested);
		}

		return data;
	}

	return useQuery<Data<"suggested", SessionExercise[]>>({
		queryKey: ["suggested", workout_id],
		queryFn: () => querySuggestedWorkoutById(workout_id),
		refetchOnWindowFocus: false,
	});
}
