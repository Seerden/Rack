import { useCallback, useEffect, useReducer } from "react";
import { useRecoilState } from "recoil";
import useCreateWorkout from "../../../../helpers/fetch/workouts/useCreateWorkout";
import { splitNameAndIndex } from "../helpers/field-with-index";
import { newWorkoutState } from "../state/new-workout-state";
import NewExercise from "../sub/NewExercise";

export default function useNewWorkout() {
	const [newWorkout, setNewWorkout] = useRecoilState(newWorkoutState);
	const { mutate } = useCreateWorkout();

	/** Reducer to manipulate `elements` state. Note that this has to be defined
	 * inside this component so that it has access to local state setters. */
	function fieldsetElementReducer(state: JSX.Element[], action: string): JSX.Element[] {
		const rowCount = state.length;

		switch (action) {
			case "add":
				return state.concat(
					<NewExercise
						key={rowCount}
						index={rowCount}
						onChange={handleInputChange}
					/>
				);
			default:
				return state;
		}
	}

	const [elements, dispatch] = useReducer(fieldsetElementReducer, [
		<NewExercise key={0} index={0} onChange={handleInputChange} />,
	]);

	useEffect(() => {
		console.log({ newWorkout });
	}, [newWorkout]);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;

		const [field, exerciseIndex] = splitNameAndIndex(name);

		// If true, we're changing an exercise field, not a workout field.
		if (typeof exerciseIndex === "number") {
			setNewWorkout((cur) => {
				const exercises = structuredClone(cur.exercises);

				exercises[exerciseIndex] = { ...exercises[exerciseIndex], [field]: value };

				return { ...cur, exercises };
			});
		}
	}

	const handleSubmit = useCallback(() => {
		mutate(newWorkout, {
			onSuccess: (data) => {
				// TODO: once authentication ipmlemented, redirect to /workouts
				alert(JSON.stringify(data));
			},
		});
	}, [newWorkout]);

	return { elements, dispatch, handleInputChange, handleSubmit } as const;
}
