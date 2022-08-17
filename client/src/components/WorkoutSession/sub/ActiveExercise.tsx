import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useRecoilState } from "recoil";
import { SubTitle } from "../../../helpers/theme/snippets/Title";
import { activeWorkoutState } from "../state/workout-state";
import { ExerciseScheme, SessionExercise } from "../types/workout-state.types";
import * as S from "./ActiveExercise.style";
import ExerciseRow from "./ExerciseRow";

/** Typeguard that validates warmupScheme is fully valid */
function isScheme(scheme: Partial<ExerciseScheme>): scheme is ExerciseScheme {
	return !!scheme.reps && !!scheme.reps && !!scheme.weight;
}

export default function ActiveExercise({
	e,
	weight_unit,
}: {
	e: SessionExercise;
	weight_unit: string;
}) {
	const [showAddWarmup, setShowAddWarmup] = useState<boolean>(false);
	const [session, setSession] = useRecoilState(activeWorkoutState);

	const [warmupScheme, setWarmupScheme] = useState<Partial<ExerciseScheme>>({
		isWarmup: true,
	});

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

			newSession[thisExerciseIndex].session.push(scheme);
			return newSession;
		});
	}

	const inputProps: Partial<InputHTMLAttributes<HTMLInputElement>> = {
		onChange: (e) => handleWarmupFieldChange(e),
		type: "number",
	};

	console.log({ session: e.session });
	return (
		<div>
			<SubTitle>Current exercise: {e.exercise_id}</SubTitle>

			{/* Add warm-up set(s) */}
			<div>
				{showAddWarmup ? (
					<S.WarmupForm
						onSubmit={(e) => {
							e.preventDefault();
							addWarmupSet(warmupScheme);
							setShowAddWarmup(false);
							setWarmupScheme({ isWarmup: true });
						}}
					>
						<span>Warmup set</span>
						<S.WarmupFields>
							<span>
								<label>Weight</label>
								<S.Input {...inputProps} name="weight" />{" "}
								<span>{weight_unit}</span>
							</span>
							<span>
								<label>Sets</label>
								<S.Input {...inputProps} name="sets" />
							</span>
							<span>
								<label>Reps</label>
								<S.Input {...inputProps} name="reps" />
							</span>
						</S.WarmupFields>
						<button>Add to warmup</button>
					</S.WarmupForm>
				) : (
					<button
						onClick={() => {
							setShowAddWarmup(true);
						}}
					>
						Add warm-up weight
					</button>
				)}
			</div>

			{structuredClone(e.session)
				.sort((a, b) => a.weight - b.weight)
				.map((scheme) => (
					<ExerciseRow
						key={scheme.weight}
						exercise_id={e.exercise_id}
						scheme={scheme}
					/>
				))}
		</div>
	);
}
