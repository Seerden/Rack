import { atom } from "recoil";
import { WorkoutInput } from "../../../../types/server/exercise.types";

export const newWorkoutState = atom<WorkoutInput>({
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

export const weightUnitState = atom<WeightUnit>({
	key: "weightUnit",
	default: "kg",
});
