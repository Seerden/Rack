import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";
import { activeWorkoutState, sessionEntriesState } from "../state/workout-state";

export default function useWorkoutSession() {
	const params = useParams();

	const { data } = useQueryWorkoutById(+(params.workout_id ?? 0));
	const workout = useMemo(() => {
		return data?.workout;
	}, [data]);

	const sessionEntries = useRecoilValue(sessionEntriesState);
	useEffect(() => {
		console.log({ sessionEntries });
	}, [sessionEntries]);

	const [session, setSession] = useRecoilState(activeWorkoutState);

	const [activeExerciseId, setActiveExerciseId] = useState<number>();
	useEffect(() => {
		// FIXME: don't have handlers yet, so termporarily setting this manually
		// so we can play around with the UI properly
		setActiveExerciseId(session[0].exercise_id);
	}, [session]);

	useEffect(() => {
		console.log({ session });
	}, [session]);

	const activeExercise = session.find((x) => x.exercise_id === activeExerciseId);

	return { workout, session, activeExerciseId, activeExercise, setSession } as const;
}
