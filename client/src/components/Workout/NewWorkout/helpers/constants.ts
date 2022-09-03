import { NewExercise, WEIGHT_UNITS } from "../../../../types/shared/exercise.types";

export const defaultExercise: NewExercise = {
	exercise_name: "",
	reps: 0,
	sets: 0,
	starting_weight: 0,
	weight_progression: 0,
	weight_unit: WEIGHT_UNITS.KG,
};

export const exerciseFields = [
	"exercise_name",
	"starting_weight",
	"sets",
	"reps",
	"weight_progression",
] as const;
