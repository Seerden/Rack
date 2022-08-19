import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { useQuerySuggestedWorkout } from "../../../helpers/fetch/workouts/useQuerySuggestedWorkout";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";
import { ID } from "../../../types/shared/id.types";
import { activeWorkoutState, sessionEntriesState } from "../state/workout-state";

export default function useWorkoutSession() {
	const params = useParams();
	const workout_id = +params.workout_id!;

	const { data } = useQueryWorkoutById(workout_id);
	const workout = useMemo(() => {
		return data?.workout;
	}, [data]);

	useQuerySuggestedWorkout(workout_id);

	const session = useRecoilValue(activeWorkoutState);
	const sessionEntries = useRecoilValue(sessionEntriesState);

	const completedExercises = useMemo(() => {
		const completedIds: ID[] = [];

		for (const exercise of session) {
			const workingScheme = exercise.session.find((x) => !x.is_warmup);

			if (!workingScheme) continue;

			const workingSets =
				sessionEntries[exercise.exercise_id]?.[workingScheme?.weight];

			if (!workingSets) continue;

			if (workingScheme.sets === workingSets.length) {
				completedIds.push(exercise.exercise_id);
			}
		}

		return completedIds;
	}, [session, sessionEntries]);

	const allCompleted = session?.length && completedExercises.length === session.length;

	const [activeExerciseId, setActiveExerciseId] = useState<number>();

	useEffect(() => {
		if (session?.length) {
			setActiveExerciseId(session[0].exercise_id);
		}
	}, [session]);

	const activeIndex = session?.findIndex((x) => x.exercise_id === activeExerciseId);
	const activeExercise = session?.[activeIndex];

	const cycleActiveIndex = useCallback(() => {
		const size = session?.length;
		const newIndex = (activeIndex + 1) % size;
		setActiveExerciseId(session[newIndex].exercise_id);
	}, [session, activeIndex, activeExerciseId]);

	return {
		workout,
		activeExercise,
		setActiveExerciseId,
		activeExerciseId,
		cycleActiveIndex,
		allCompleted,
	} as const;
}
