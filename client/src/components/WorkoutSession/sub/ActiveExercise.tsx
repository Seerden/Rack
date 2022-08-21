import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { slideVariants } from "../../../helpers/framer/variants/slide-variants";
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
		<AnimatePresence mode="popLayout" initial={false}>
			<S.ActiveExercise
				key={`activeExercise-${e.exercise_id}`}
				as={motion.section}
				variants={slideVariants}
				initial="hidden"
				animate="appear"
				exit="exit"
				style={{ overflow: "hidden" }}
			>
				<S.ActiveTitle as={motion.header} key="activeTitle">
					<motion.h1>
						{
							workout.exercises.find((ex) => ex.exercise_id === e.exercise_id)
								?.exercise_name
						}
					</motion.h1>
					<AnimatePresence initial={false}>
						{!showAddWarmup && (
							<S.Button
								as={motion.button}
								onClick={() => {
									setShowAddWarmup(true);
								}}
								initial={{
									color: "transparent",
									scaleX: 0,
								}}
								animate={{
									color: "black",
									scaleX: 1,
								}}
								exit={{
									color: "transparent",
									scaleX: 0,
								}}
							>
								Add warm-up weight
							</S.Button>
						)}
					</AnimatePresence>
				</S.ActiveTitle>

				<AnimatePresence mode="popLayout" key="warmupPresence">
					{showAddWarmup && (
						<S.Warmup
							as={motion.section}
							layout
							key="warmup"
							initial={{ y: "-100%", opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								type: "spring",
								duration: 0.45,
								bounce: 0.2,
							}}
						>
							<S.WarmupForm
								onSubmit={(e) => {
									e.preventDefault();
									addWarmupSet(warmupScheme);
									setShowAddWarmup(false);
									setWarmupScheme(defaultWarmupScheme);
								}}
							>
								<h1>New warm-up set:</h1>
								<S.WarmupFields>
									<p>
										<label>Weight</label>
										<span>
											<S.Input {...inputProps} name="weight" />{" "}
											<span>{weight_unit}</span>
										</span>
									</p>
									<p>
										<label>Sets</label>
										<S.Input {...inputProps} name="sets" />
									</p>
									<p>
										<label>Reps</label>
										<S.Input {...inputProps} name="reps" />
									</p>
									<S.SaveButton type="submit" title="Add to warm-up">
										<FaPlus size={11} />
									</S.SaveButton>
								</S.WarmupFields>
							</S.WarmupForm>
						</S.Warmup>
					)}
				</AnimatePresence>

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
		</AnimatePresence>
	);
}
