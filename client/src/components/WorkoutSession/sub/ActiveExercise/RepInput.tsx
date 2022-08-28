import { ChangeEvent, useRef } from "react";
import { useRecoilState } from "recoil";
import { ID } from "../../../../types/shared/id.types";
import { ExerciseScheme } from "../../../../types/shared/session.types";
import { sessionEntriesState } from "../../state/workout-state";
import * as S from "./ActiveExercise.style";

type RepInputProps = {
	index: number;
	exercise_id: ID;
	scheme: ExerciseScheme;
	cycleIndex: () => void;
};

export default function RepInput({
	index,
	exercise_id,
	scheme: { weight, sets, is_warmup },
	cycleIndex,
}: RepInputProps) {
	const [sessionEntries, setSessionEntries] = useRecoilState(sessionEntriesState);

	/**
	 * Change handler that adds the performed reps to `sessionEntries` state.
	 * NOTE: all state used in here is passed as a prop to this component, so
	 * this function doesn't need to be a callback.
	 */
	function updateSessionEntries(e: ChangeEvent<HTMLInputElement>) {
		setSessionEntries((cur) => {
			const newEntries = structuredClone(cur);
			const hasValue =
				typeof newEntries[exercise_id]?.[weight]?.[index]?.reps === "number";
			const newValue = {
				reps: +e.target.value,
				// NOTE: a `timestamp` is only created once; the first time a value
				// is set for  the exercise set. Changing the value doesn't re-set
				// the timestamp.
				timestamp: hasValue
					? newEntries[exercise_id][weight][index].timestamp
					: new Date(),
			};

			newEntries[exercise_id] ??= { [weight]: [] }; // Set a default in case this is the first set performed for this _exercise_
			newEntries[exercise_id][weight] ??= []; // Again, set a default in case this is the first set for this _weight_
			newEntries[exercise_id][weight][index] = newValue;

			return newEntries;
		});
	}

	// Use a ref so that this doesn't update on rerender -- we only want to use
	// the initial value.
	const defaultValue = useRef<number | null>(
		sessionEntries[exercise_id]?.[weight]?.[index]?.reps
	);

	return (
		<S.Input
			type="number"
			min={0}
			name={`${exercise_id}-set-${index}`}
			autoComplete="disabled"
			{...(defaultValue.current && { defaultValue: defaultValue.current })}
			onChange={(e) => updateSessionEntries(e)}
			onBlur={(e) => {
				console.log({ defaultValue });
				// On blurring the last working set, move to the next exercise.
				if (!e.target.value || +e.target.value === defaultValue.current) return;
				if (index === sets - 1 && !is_warmup) {
					cycleIndex();
				}
			}}
		/>
	);
}
