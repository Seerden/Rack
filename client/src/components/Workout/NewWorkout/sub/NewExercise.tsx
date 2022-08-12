import { ChangeEventHandler, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { NewExercise, WEIGHT_UNITS } from "../../../../types/shared/exercise.types";
import useNewExercise from "../hooks/useNewExercise";
import * as S from "../NewWorkout.style";
import {
	newWorkoutState,
	openIndexState,
	weightUnitState,
} from "../state/new-workout-state";
import CollapsedExercise from "./CollapsedExercise";

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

	const openIdx = useRecoilValue(openIndexState);
	const collapsed = useMemo(() => {
		return openIdx !== index;
	}, [openIdx]);

	if (collapsed) {
		return <CollapsedExercise index={index} {...exercise} />;
	}

	return (
		<S.Fieldset>
			<S.Field gridArea="exercise">
				<S.Label htmlFor={fields.exercise_name}>Exercise:</S.Label>
				<S.Input
					type="text"
					id={fields.exercise_name}
					name={fields.exercise_name}
					defaultValue={exercise.exercise_name}
					onChange={(e) => onChange?.(e)}
				/>
			</S.Field>

			<S.Field gridArea="weight">
				<S.Label htmlFor={fields.starting_weight}>Starting weight</S.Label>
				<S.InputWithUnit>
					<S.Input
						type="text"
						id={fields.starting_weight}
						name={fields.starting_weight}
						defaultValue={exercise.starting_weight}
						onChange={(e) => onChange?.(e)}
					/>
					<span>{weightUnit}</span>
				</S.InputWithUnit>
			</S.Field>

			<S.Field gridArea="scheme">
				<S.Label>Rep scheme:</S.Label>
				<S.InputGroup>
					<S.SubField>
						<S.Label htmlFor={fields.sets}>Sets</S.Label>
						<S.Input
							id={fields.sets}
							name={fields.sets}
							type={"number"}
							defaultValue={exercise.sets}
							min={1}
							onChange={(e) => onChange?.(e)}
						/>
					</S.SubField>
					<S.Icon>x</S.Icon>
					<S.SubField>
						<S.Label htmlFor={fields.reps}>Reps</S.Label>
						<S.Input
							id={fields.reps}
							name={fields.reps}
							defaultValue={exercise.reps}
							type={"number"}
							min={1}
							onChange={(e) => onChange?.(e)}
						/>
					</S.SubField>
				</S.InputGroup>
			</S.Field>

			<S.Field gridArea="progress">
				<S.Label htmlFor={fields.weight_progression}>Weight progression</S.Label>
				<S.InputWithUnit>
					<S.Input
						type="text"
						defaultValue={exercise.weight_progression}
						id={fields.weight_progression}
						name={fields.weight_progression}
						onChange={(e) => onChange?.(e)}
					/>
					<span>{weightUnit}</span>
				</S.InputWithUnit>
			</S.Field>
		</S.Fieldset>
	);
}
