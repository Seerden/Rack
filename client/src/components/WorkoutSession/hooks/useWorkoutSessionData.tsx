import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useQuerySuggestedWorkout } from "../../../helpers/fetch/workouts/useQuerySuggestedWorkout";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";
import useRouterProps from "../../../hooks/useRouterProps";
import { activeWorkoutState, sessionEntriesState } from "../state/workout-state";

export default function useWorkoutSessionData() {
	const { params } = useRouterProps();

	const workout_id = +params.workout_id!;
	const { data } = useQueryWorkoutById(workout_id);
	const workout = data?.workout;

	const session = useRecoilValue(activeWorkoutState);
	const resetSession = useResetRecoilState(activeWorkoutState);
	const sessionEntries = useRecoilValue(sessionEntriesState);
	const resetEntries = useResetRecoilState(sessionEntriesState);

	useQuerySuggestedWorkout(workout_id);

	useEffect(() => {
		return () => {
			resetSession();
			resetEntries();
		};
	}, []);

	return { workout, session, sessionEntries } as const;
}
