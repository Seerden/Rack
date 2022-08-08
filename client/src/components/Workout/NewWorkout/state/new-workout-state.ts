import { atom } from "recoil";
import { NewWorkout } from "../../../../types/exercise.types";

export const newWorkoutState = atom<NewWorkout>({
	key: "newWorkout",
	default: {
		name: "",
		exercises: [],
	},
});
