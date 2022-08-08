import { atom } from "recoil";
import { NewWorkout } from "../../../../types/exercise.types";

export const newWorkoutState = atom<NewWorkout>({
	key: "newWorkout",
	default: {
		name: "",
		exercises: [],
	},
});

export const openIndexState = atom<number>({
	key: "openIndex",
	default: 0,
});
