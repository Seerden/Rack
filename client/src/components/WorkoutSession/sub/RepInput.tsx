import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { ID } from "../../../types/shared/id.types";
import { sessionEntriesState } from "../state/workout-state";
import { ExerciseScheme } from "../types/workout-state.types";
import * as S from "./ActiveExercise.style";

type RepInputProps = {
	index: number;
	exercise_id: ID;
	scheme: ExerciseScheme;
};

export default function RepInput({ index, exercise_id, scheme }: RepInputProps) {
	const [sessionEntries, setSessionEntries] = useRecoilState(sessionEntriesState);

	/**
	 * Change handler that adds the performed reps to `sessionEntries` state.
	 * NOTE: a `timestamp` is only created once the first time a value is set for
	 * the exercise set. Changing the value doesn't re-set the timestamp.
	 *
	 * NOTE: all state used in here is passed as a prop, so this doesn't need to
	 * be a callback.
	 */
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setSessionEntries((cur) => {
			const newEntries = structuredClone(cur); // Clone so we can safely mutate directly

			const hasValue =
				typeof newEntries[exercise_id]?.[scheme.weight]?.[index]?.reps === "number";

			const newValue = {
				reps: +e.target.value,
				timestamp: hasValue
					? newEntries[exercise_id][scheme.weight][index].timestamp
					: new Date(),
			};

			newEntries[exercise_id] ??= { [scheme.weight]: [] }; // Set a default in case this is the first set performed for this _exercise_
			newEntries[exercise_id][scheme.weight] ??= []; // Again, set a default in case this is the first set for this _weight_
			newEntries[exercise_id][scheme.weight][index] = newValue;

			return newEntries;
		});
	}

	return (
		<S.Input
			type="number"
			min={0}
			defaultValue={
				sessionEntries[exercise_id]?.[scheme.weight]?.[index]?.reps ?? null
			}
			onChange={(e) => handleChange(e)}
		/>
	);
}
