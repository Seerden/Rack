import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { minimalSlideVariants } from "../../../../helpers/framer/variants/slide-variants";
import { NewExercise, WEIGHT_UNITS } from "../../../../types/shared/exercise.types";
import { isValidNewExercise } from "../helpers/validate";
import useNewExercise from "../hooks/useNewExercise";
import * as S from "../NewWorkout.style";
import {
	newWorkoutState,
	openIndexState,
	weightUnitState,
} from "../state/new-workout-state";

type NewExerciseProps = {
	index: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};

const defaultExercise: NewExercise = {
	exercise_name: "",
	reps: 0,
	sets: 0,
	starting_weight: 0,
	weight_progression: 0,
	weight_unit: WEIGHT_UNITS.KG,
};

export default function NewExercise({ index, onChange }: NewExerciseProps) {
	const { fields } = useNewExercise(index);
	const newWorkout = useRecoilValue(newWorkoutState);
	const weightUnit = useRecoilValue(weightUnitState);
	const exercise = useMemo(() => {
		return newWorkout?.exercises[index] ?? defaultExercise;
	}, [newWorkout]);

	const isValid = isValidNewExercise(exercise);

	const [openIdx, setOpenIdx] = useRecoilState(openIndexState);
	const collapsed = useMemo(() => {
		return openIdx !== index;
	}, [openIdx]);

	const getInputProps = useCallback(
		(field: keyof typeof fields) => ({
			exit: {
				opacity: 0,
				backgroundColor: "transparent",
			},
			defaultValue: exercise[field],
			id: fields[field],
			name: fields[field],
			onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e),
		}),
		[onChange]
	);

	return (
		<S.Fieldset
			key={`m.exercise-${index}`}
			$isValid={isValid}
			style={{ overflow: "hidden" }}
			as={motion.fieldset}
			onClick={(e: any) => {
				e.stopPropagation();
				setOpenIdx(index);
			}}
		>
			<AnimatePresence mode="popLayout">
				{collapsed && (
					<motion.div
						key="m.name"
						variants={minimalSlideVariants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						{exercise.exercise_name?.length
							? exercise.exercise_name
							: "Unnamed exercise"}
					</motion.div>
				)}
				{!collapsed && (
					<S.FieldsWrapper
						as={motion.div}
						key="m.fields"
						variants={minimalSlideVariants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<S.Field gridArea="exercise">
							<S.Label htmlFor={fields.exercise_name}>Exercise:</S.Label>
							<S.Input
								{...getInputProps("exercise_name")}
								type="text"
								onChange={(e) => onChange?.(e)}
							/>
						</S.Field>

						<S.Field gridArea="weight">
							<S.Label htmlFor={fields.starting_weight}>Starting weight</S.Label>
							<S.InputWithUnit>
								<S.Input {...getInputProps("starting_weight")} type="text" />
								<span>{weightUnit}</span>
							</S.InputWithUnit>
						</S.Field>

						<S.Field gridArea="scheme">
							<S.Label>Rep scheme:</S.Label>
							<S.InputGroup>
								<S.SubField>
									<S.Label htmlFor={fields.sets}>Sets</S.Label>
									<S.Input {...getInputProps("sets")} type={"number"} min={1} />
								</S.SubField>
								<S.Icon>x</S.Icon>
								<S.SubField>
									<S.Label htmlFor={fields.reps}>Reps</S.Label>
									<S.Input {...getInputProps("reps")} type={"number"} min={1} />
								</S.SubField>
							</S.InputGroup>
						</S.Field>

						<S.Field gridArea="progress">
							<S.Label htmlFor={fields.weight_progression}>
								Weight progression
							</S.Label>
							<S.InputWithUnit>
								<S.Input {...getInputProps("weight_progression")} type="text" />
								<span>{weightUnit}</span>
							</S.InputWithUnit>
						</S.Field>
					</S.FieldsWrapper>
				)}
			</AnimatePresence>
		</S.Fieldset>
	);
}
