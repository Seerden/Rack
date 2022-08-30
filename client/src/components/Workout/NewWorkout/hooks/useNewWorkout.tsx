import { ChangeEvent, useCallback, useEffect, useReducer, useRef } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import useCreateWorkout from "../../../../helpers/fetch/workouts/useCreateWorkout";
import useRouterProps from "../../../../hooks/useRouterProps";
import { splitNameAndIndex } from "../helpers/field-with-index";
import { parseNewWorkout } from "../helpers/parse";
import { newWorkoutState, weightUnitState } from "../state/new-workout-state";
import NewExercise from "../sub/NewExercise";

export default function useNewWorkout() {
	const deleteCount = useRef(0);
	const [newWorkout, setNewWorkout] = useRecoilState(newWorkoutState);
	const resetNewWorkout = useResetRecoilState(newWorkoutState);
	const { mutate } = useCreateWorkout();
	const { navigate } = useRouterProps();
	const weightUnit = useRecoilValue(weightUnitState);

	useEffect(() => {
		return () => resetNewWorkout();
	}, []);

	/** Reducer to manipulate `elements` state. Note that this has to be defined
	 * inside this component so that it has access to local state setters. */
	function fieldsetElementReducer(
		state: JSX.Element[],
		action: { type: string; index?: number }
	): JSX.Element[] {
		const rowCount = state.length;
		const id = rowCount + deleteCount.current;

		switch (action.type) {
			case "add":
				return state.concat(
					<NewExercise
						key={id}
						index={id}
						onChange={handleInputChange}
						onDelete={() => dispatch({ type: "delete", index: id })}
					/>
				);
			case "delete":
				deleteCount.current++;
				return state.filter((x) => +x.key! !== action.index);
			default:
				return state;
		}
	}

	const [elements, dispatch] = useReducer(fieldsetElementReducer, [
		<NewExercise
			key={0}
			index={0}
			onChange={handleInputChange}
			onDelete={() => dispatch({ type: "delete", index: 0 })}
		/>,
	]);

	function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.currentTarget;
		const [field, exerciseIndex] = splitNameAndIndex(name);

		// NewExercise input names are like 'exercise_name-1', and NewWorkout
		// inputs like 'name' -- these, when split, will have exerciseIndex === NaN.
		if (!isNaN(exerciseIndex)) {
			setNewWorkout((cur) => {
				const exercises = structuredClone(cur.exercises);
				exercises[exerciseIndex] = { ...exercises[exerciseIndex], [field]: value };
				return { ...cur, exercises };
			});
		} else {
			setNewWorkout((cur) => ({
				...cur,
				[name]: value,
			}));
		}
	}

	const handleSubmit = useCallback(() => {
		mutate(parseNewWorkout(newWorkout, weightUnit), {
			onSuccess: (data) => {
				navigate("/workouts");
			},
		});
	}, [newWorkout]);

	return { elements, dispatch, handleInputChange, handleSubmit } as const;
}
