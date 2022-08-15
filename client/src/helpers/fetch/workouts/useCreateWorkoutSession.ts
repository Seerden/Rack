import { useMutation } from "@tanstack/react-query";
import {
	WorkoutSessionWithEntries,
	WorkoutSessionWithEntriesInput,
} from "../../../types/shared/session.types";
import { baseUrl, postConfig } from "../fetch-constants";

async function postWorkoutSession(newWorkoutSession: WorkoutSessionWithEntriesInput) {
	return (
		await fetch(`${baseUrl}/exercise/workouts/session`, {
			...postConfig,
			body: JSON.stringify({ newWorkoutSession }),
		})
	).json();
}

export default function useCreateWorkoutSession() {
	return useMutation<WorkoutSessionWithEntries, any, WorkoutSessionWithEntriesInput>(
		["workout/session"],
		async (session) => postWorkoutSession(session)
	);
}
