import { atom, selector } from "recoil";
import {
	NewExercise,
	WeightUnit,
	WorkoutInput,
} from "../../../../types/shared/exercise.types";
import { defaultExercise } from "../helpers/constants";

export type RawNewWorkout = Omit<WorkoutInput, "exercises"> & {
	exercises: Array<Omit<NewExercise, "weight_unit">>;
	sharedExercises: number[];
};

export const weightUnitState = atom<WeightUnit>({
	key: "weightUnit",
	default: "kg",
});

export const newWorkoutState = atom<RawNewWorkout>({
	key: "newWorkout",
	default: selector({
		key: "newWorkoutSelector",
		get: ({ get }) => ({
			weight_unit: get(weightUnitState),
			name: "",
			exercises: [defaultExercise],
			sharedExercises: [],
		}),
	}),
});

export const openIndexState = atom<number>({
	key: "openIndex",
	default: 0,
});
