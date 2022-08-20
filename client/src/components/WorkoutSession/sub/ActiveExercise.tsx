import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useSetRecoilState } from "recoil";
import { WEIGHT_UNITS, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ExerciseScheme, SessionExercise } from "../../../types/shared/session.types";
import { activeWorkoutState } from "../state/workout-state";
import * as S from "./ActiveExercise.style";
import ExerciseRow from "./ExerciseRow";

/** Typeguard that validates warmupScheme is fully valid */
function isScheme(scheme: Partial<ExerciseScheme>): scheme is ExerciseScheme {
	return !!scheme.reps && !!scheme.reps && !!scheme.weight;
}

type ActiveExerciseProps = {
	e: SessionExercise;
	workout: WorkoutWithExercises;
	weight_unit: WEIGHT_UNITS;
	cycleIndex: () => void;
};

export default function ActiveExercise({
	e,
	workout,
	weight_unit,
	cycleIndex,
}: ActiveExerciseProps) {
	const [showAddWarmup, setShowAddWarmup] = useState<boolean>(false);
	const setSession = useSetRecoilState(activeWorkoutState);

	const defaultWarmupScheme: Partial<ExerciseScheme> = {
		is_warmup: true,
		weight_unit,
		exercise_id: e.exercise_id,
	};

	const [warmupScheme, setWarmupScheme] =
		useState<Partial<ExerciseScheme>>(defaultWarmupScheme);

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

			newSession[thisExerciseIndex].session.push({
				...scheme,
			});
			return newSession;
		});
	}

	const inputProps: Partial<InputHTMLAttributes<HTMLInputElement>> = {
		onChange: (e) => handleWarmupFieldChange(e),
		type: "number",
	};

	return (
		<S.ActiveExercise>
			<S.ActiveTitle>
				<h1>
					{
						workout.exercises.find((ex) => ex.exercise_id === e.exercise_id)
							?.exercise_name
					}
				</h1>
				{!showAddWarmup && (
					<S.Button
						onClick={() => {
							setShowAddWarmup(true);
						}}
					>
						Add warm-up weight
					</S.Button>
				)}
			</S.ActiveTitle>

			<S.Warmup>
				{showAddWarmup && (
					<S.WarmupForm
						onSubmit={(e) => {
							e.preventDefault();
							addWarmupSet(warmupScheme);
							setShowAddWarmup(false);
							setWarmupScheme(defaultWarmupScheme);
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
				)}
			</S.Warmup>

			{structuredClone(e.session)
				.sort((a, b) => a.weight - b.weight)
				.map((scheme) => (
					<ExerciseRow
						cycleIndex={cycleIndex}
						key={scheme.weight}
						exercise_id={e.exercise_id}
						scheme={scheme}
					/>
				))}
		</S.ActiveExercise>
	);
}
