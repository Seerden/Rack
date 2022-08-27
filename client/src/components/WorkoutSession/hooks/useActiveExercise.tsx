import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ExerciseScheme, SessionExercise } from "../../../types/shared/session.types";
import { activeWorkoutState } from "../state/workout-state";
import { isScheme } from "../types/is-scheme";

export default function useActiveExercise(
	defaultWarmupScheme: Partial<ExerciseScheme>,
	e: SessionExercise
) {
	const [showAddWarmup, setShowAddWarmup] = useState<boolean>(false);
	const [warmupScheme, setWarmupScheme] =
		useState<Partial<ExerciseScheme>>(defaultWarmupScheme);
	const setSession = useSetRecoilState(activeWorkoutState);

	function handleWarmupFieldChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;
		setWarmupScheme((cur) => ({ ...cur, [name]: +value }));
	}

	function addWarmupSet(scheme: Partial<ExerciseScheme>) {
		if (!isScheme(scheme)) return;

		setSession((cur) => {
			const newSession = structuredClone(cur);
			const thisExerciseIndex = cur.findIndex((x) => x.exercise_id === e?.exercise_id);

			if (!(thisExerciseIndex >= 0)) return cur;

			newSession[thisExerciseIndex].schemes.push(scheme);

			return newSession;
		});
	}

	const inputProps: InputHTMLAttributes<HTMLInputElement> = {
		onChange: (e) => handleWarmupFieldChange(e),
		type: "number",
		min: 0,
	};

	return {
		showAddWarmup,
		setShowAddWarmup,
		warmupScheme,
		setWarmupScheme,
		addWarmupSet,
		inputProps,
	} as const;
}
