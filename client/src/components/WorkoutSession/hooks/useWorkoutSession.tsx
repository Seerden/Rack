import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useCreateWorkoutSession from "../../../helpers/fetch/workouts/useCreateWorkoutSession";
import useRouterProps from "../../../hooks/useRouterProps";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import {
	SessionExercise,
	WorkoutSessionWithEntriesInput,
} from "../../../types/shared/session.types";
import { parseSessionEntries } from "../helpers/parse-session-entries";
import { SessionEntriesInput } from "../types/workout-state.types";

type Args = {
	workout: WorkoutWithExercises;
	session: SessionExercise[];
	sessionEntries: SessionEntriesInput;
};

export default function useWorkoutSession({ workout, session, sessionEntries }: Args) {
	const { navigate } = useRouterProps();
	const startDate = useRef(new Date());
	const { mutate } = useCreateWorkoutSession();

	const allCompleted = useMemo(() => {
		const completedIds: ID[] = [];

		for (const exercise of session) {
			const workingScheme = exercise.schemes.find((x) => !x.is_warmup);
			if (!workingScheme) continue;

			const workingSets =
				sessionEntries[exercise.exercise_id]?.[workingScheme?.weight];

			if (!workingSets) continue;

			if (workingScheme.sets === workingSets.length) {
				completedIds.push(exercise.exercise_id);
			}
		}

		return session.length && completedIds.length === session.length;
	}, [session, sessionEntries]);

	const [activeExerciseId, setActiveExerciseId] = useState(session[0].exercise_id);
	const activeIndex = session?.findIndex((x) => x.exercise_id === activeExerciseId);
	const activeExercise = session?.[activeIndex];

	const cycleActiveIndex = useCallback(() => {
		const size = session?.length;
		const newIndex = (activeIndex + 1) % size;
		setActiveExerciseId(session[newIndex].exercise_id);
	}, [session, activeIndex, activeExerciseId]);

	// TODO: dev-only state logging
	useEffect(() => {
		console.log({ sessionEntries, session });
	}, [sessionEntries, session]);

	const handleSubmit = useCallback(() => {
		if (!allCompleted) return;

		const sessionWithEntries: WorkoutSessionWithEntriesInput = {
			workout_id: workout.workout_id,
			completed_at: new Date(),
			started_at: startDate.current,
			created_at: new Date(),
			entries: parseSessionEntries(sessionEntries, workout.weight_unit, session),
		};

		mutate(sessionWithEntries, {
			onSuccess: () => {
				// TODO: probably also want to optimistically set the received
				// session in query cache, but we don't use this anywhere yet, so
				// leave it be for now
				navigate("/workouts");
			},
		});
	}, [session, sessionEntries, workout.weight_unit]);

	return {
		activeExercise,
		activeExerciseId,
		allCompleted,
		setActiveExerciseId,
		cycleActiveIndex,
		handleSubmit,
	} as const;
}
