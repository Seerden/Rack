import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import useCreateWorkoutSession from "../../../helpers/fetch/workouts/useCreateWorkoutSession";
import { useQuerySuggestedWorkout } from "../../../helpers/fetch/workouts/useQuerySuggestedWorkout";
import { useQueryWorkoutById } from "../../../helpers/fetch/workouts/useQueryWorkoutById";
import { ID } from "../../../types/shared/id.types";
import { WorkoutSessionWithEntriesInput } from "../../../types/shared/session.types";
import { parseSessionEntries } from "../helpers/parse-session-entries";
import { activeWorkoutState, sessionEntriesState } from "../state/workout-state";

export default function useWorkoutSession() {
	const params = useParams();
	const navigate = useNavigate();
	const workout_id = +params.workout_id!;

	const startDate = useRef(new Date());

	const { mutate } = useCreateWorkoutSession();
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

	const handleSubmit = useCallback(() => {
		if (!workout || !allCompleted) return;

		const sessionWithEntries: WorkoutSessionWithEntriesInput = {
			workout_id,
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
	}, [session, sessionEntries, workout]);

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

	// TODO: dev-only state logging
	useEffect(() => {
		console.log({ sessionEntries, session });
	}, [sessionEntries, session]);

	return {
		workout,
		activeExercise,
		setActiveExerciseId,
		activeExerciseId,
		cycleActiveIndex,
		allCompleted,
		handleSubmit,
	} as const;
}
