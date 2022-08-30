import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultExercise, exerciseFields } from "../helpers/constants";
import { stringWithIndexFunctor } from "../helpers/field-with-index";
import { isValidNewExercise } from "../helpers/validate";
import {
	newWorkoutState,
	openIndexState,
	weightUnitState,
} from "../state/new-workout-state";

export default function useNewExercise(index: number) {
	const fieldWithIndex = stringWithIndexFunctor(index);
	const fields = exerciseFields.reduce((acc, cur) => {
		acc[cur] = fieldWithIndex(cur);
		return acc;
	}, {} as { [k in typeof exerciseFields[number]]: string });
	const [newWorkout, setNewWorkout] = useRecoilState(newWorkoutState);
	const weightUnit = useRecoilValue(weightUnitState);
	const exercise = useMemo(
		() => newWorkout?.exercises[index] ?? defaultExercise,
		[newWorkout]
	);
	const isValid = isValidNewExercise(exercise);
	const [openIdx, setOpenIdx] = useRecoilState(openIndexState);
	const collapsed = useMemo(() => openIdx !== index, [openIdx]);

	useEffect(() => {
		setOpenIdx(index);
	}, []);

	return {
		fields,
		exercise,
		isValid,
		openIdx,
		setOpenIdx,
		collapsed,
		setNewWorkout,
		weightUnit,
	} as const;
}
