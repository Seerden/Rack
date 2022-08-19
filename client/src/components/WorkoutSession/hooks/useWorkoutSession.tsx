import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuerySuggestedWorkout } from "../../../helpers/fetch/workouts/useQuerySuggestedWorkout";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";
import { activeWorkoutState, sessionEntriesState } from "../state/workout-state";

export default function useWorkoutSession() {
	const params = useParams();
	const workout_id = +params.workout_id!;

	const { data } = useQueryWorkoutById(workout_id);
	const workout = useMemo(() => {
		return data?.workout;
	}, [data]);

	useQuerySuggestedWorkout(workout_id);

	const sessionEntries = useRecoilValue(sessionEntriesState);
	useEffect(() => {
		console.log({ sessionEntries });
	}, [sessionEntries]);

	const [session, setSession] = useRecoilState(activeWorkoutState);

	const [activeExerciseId, setActiveExerciseId] = useState<number>();
	useEffect(() => {
		if (session?.length) {
			setActiveExerciseId(session[0].exercise_id);
		}
	}, [session]);

	useEffect(() => {
		console.log({ session });
	}, [session]);

	const activeExercise = session?.find((x) => x.exercise_id === activeExerciseId);

	return { workout, session, activeExerciseId, activeExercise, setSession } as const;
}
