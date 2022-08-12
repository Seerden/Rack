import { atom } from "recoil";
import {
	NewExercise,
	WeightUnit,
	WorkoutInput,
} from "../../../../types/shared/exercise.types";

export type RawNewWorkout = Omit<WorkoutInput, "exercises"> & {
	exercises: Array<Omit<NewExercise, "weight_unit">>;
};

export const newWorkoutState = atom<RawNewWorkout>({
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
