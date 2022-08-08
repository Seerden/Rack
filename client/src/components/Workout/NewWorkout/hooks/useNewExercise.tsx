import { stringWithIndexFunctor } from "../helpers/field-with-index";

const exerciseFields = [
	"exercise",
	"starting_weight",
	"sets",
	"reps",
	"progression",
] as const;

export default function useNewExercise(index: number) {
	const fieldWithIndex = stringWithIndexFunctor(index);

	const fields = exerciseFields.reduce((acc, cur) => {
		acc[cur] = fieldWithIndex(cur);
		return acc;
	}, {} as { [k in typeof exerciseFields[number]]: string });

	return { fields } as const;
}