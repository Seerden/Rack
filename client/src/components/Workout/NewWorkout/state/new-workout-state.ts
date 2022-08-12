import { atom } from "recoil";
import { WeightUnit } from "../../../../types/exercise.types";
import { NewExercise, WorkoutInput } from "../../../../types/server/exercise.types";

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
