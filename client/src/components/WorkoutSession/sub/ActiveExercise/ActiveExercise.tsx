import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import {
	scaleOutVariants,
	slideBounceVariants,
	slideVariants,
} from "../../../../helpers/framer/variants/slide-variants";
import { Exercise, WeightUnit } from "../../../../types/shared/exercise.types";
import { ExerciseScheme, SessionExercise } from "../../../../types/shared/session.types";
import useActiveExercise from "../../hooks/useActiveExercise";
import * as S from "./ActiveExercise.style";
import ExerciseRow from "./ExerciseRow";

type ActiveExerciseProps = {
	e: SessionExercise;
	exercises: Exercise[];
	weight_unit: WeightUnit;
	cycleIndex: () => void;
};

export default function ActiveExercise({
	e,
	exercises,
	weight_unit,
	cycleIndex,
}: ActiveExerciseProps) {
	const defaultWarmupScheme: Partial<ExerciseScheme> = {
		is_warmup: true,
		weight_unit,
		exercise_id: e.exercise_id,
	};

	const {
		showAddWarmup,
		setShowAddWarmup,
		warmupScheme,
		setWarmupScheme,
		addWarmupSet,
		inputProps,
	} = useActiveExercise(defaultWarmupScheme, e.exercise_id);

	return (
		<AnimatePresence mode="popLayout" initial={false}>
			<S.ActiveExercise
				key={`m.activeExercise-${e.exercise_id}`}
				variants={slideVariants}
				initial="hidden"
				animate="appear"
				exit="exit"
				style={{ overflow: "hidden" }}
			>
				<S.ActiveTitle key="m.activeTitle">
					<motion.h1>
						{
							exercises.find((ex) => ex.exercise_id === e.exercise_id)
								?.exercise_name
						}
					</motion.h1>

					<AnimatePresence initial={false}>
						{!showAddWarmup && (
							<S.Button
								key="m.button"
								onClick={() => {
									setShowAddWarmup(true);
								}}
								variants={scaleOutVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								Add warm-up weight
							</S.Button>
						)}
					</AnimatePresence>
				</S.ActiveTitle>

				<AnimatePresence mode="popLayout" key="m.warmupPresence">
					{showAddWarmup && (
						<S.Warmup
							layout
							key="warmup"
							variants={slideBounceVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={slideBounceVariants.transition}
						>
							<S.WarmupForm
								onSubmit={(e) => {
									e.preventDefault();
									addWarmupSet(warmupScheme);
									setShowAddWarmup(false);
									setWarmupScheme(defaultWarmupScheme);
								}}
							>
								<S.WarmUpLabel>New warm-up set:</S.WarmUpLabel>
								<S.WarmupFields>
									<p>
										<label htmlFor="weight">Weight</label>
										<span>
											<S.Input {...inputProps} id="weight" name="weight" />{" "}
											<span>{weight_unit}</span>
										</span>
									</p>

									<p>
										<label htmlFor="sets">Sets</label>
										<S.Input {...inputProps} id="sets" name="sets" />
									</p>

									<p>
										<label htmlFor="reps">Reps</label>
										<S.Input {...inputProps} id="reps" name="reps" />
									</p>

									<S.SaveButton type="submit" title="Add to warm-up">
										<FaPlus size={11} />
									</S.SaveButton>
								</S.WarmupFields>
							</S.WarmupForm>
						</S.Warmup>
					)}
				</AnimatePresence>

				{structuredClone(e.schemes)
					.sort((a, b) => a.weight - b.weight)
					.map((scheme) => (
						<ExerciseRow
							cycleIndex={cycleIndex}
							key={`${scheme.exercise_id}-${scheme.weight}`}
							exercise_id={e.exercise_id}
							scheme={scheme}
						/>
					))}
			</S.ActiveExercise>
		</AnimatePresence>
	);
}
