import { atom } from "recoil";
import { SessionExercise } from "../../../types/shared/session.types";
import { SessionEntriesInput } from "../types/workout-state.types";

export const activeWorkoutState = atom<SessionExercise[]>({
	default: [],
	key: "activeWorkout",
});

export const sessionEntriesState = atom<SessionEntriesInput>({
	key: "sessionEntries",
	default: {},
});
