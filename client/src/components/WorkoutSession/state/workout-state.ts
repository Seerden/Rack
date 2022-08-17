import { atom } from "recoil";
import { defaultActiveWorkout } from "../helpers/mock";
import { SessionEntriesInput, SessionExercise } from "../types/workout-state.types";

export const activeWorkoutState = atom<SessionExercise[]>({
	default: defaultActiveWorkout,
	key: "activeWorkout",
});

export const sessionEntriesState = atom<SessionEntriesInput>({
	key: "sessionEntries",
	default: {},
});
