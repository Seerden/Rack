import * as S from "../NewWorkout.style";

type NewExerciseProps = {
	index: number;
};

function stringWithIndex(s: string, index: number) {
	return `${s}-${index}`;
}

const stringWithIndexFunctor = (index: number) => {
	return (s: string) => stringWithIndex(s, index);
};

export default function NewExercise({ index }: NewExerciseProps) {
	const withIndex = stringWithIndexFunctor(index);
	const exerciseField = withIndex("exercise");
	const startingWeightField = withIndex("starting_weight");
	const setsField = withIndex("sets");
	const repsField = withIndex("reps");
	const progressionField = withIndex("progression");

	return (
		<S.Fieldset>
			<S.Field gridArea="exercise">
				<S.Label htmlFor={exerciseField}>Exercise:</S.Label>
				<S.Input type="text" id={exerciseField} name={exerciseField} />
			</S.Field>

			<S.Field gridArea="weight">
				<S.Label htmlFor={startingWeightField}>Starting weight</S.Label>
				<S.InputWithSelect>
					<S.Input type="text" id={startingWeightField} name={startingWeightField} />
					<S.Select>
						<option>kg</option>
						<option>lbs</option>
					</S.Select>
				</S.InputWithSelect>
			</S.Field>

			<S.Field gridArea="scheme">
				<S.Label>Rep scheme:</S.Label>
				<S.InputGroup>
					<S.SubField>
						<S.Label htmlFor={setsField}>Sets</S.Label>
						<S.Input id={setsField} name={setsField} type={"number"} min={1} />
					</S.SubField>
					<S.Icon>x</S.Icon>
					<S.SubField>
						<S.Label htmlFor={repsField}>Reps</S.Label>
						<S.Input id={repsField} name={repsField} type={"number"} min={1} />
					</S.SubField>
				</S.InputGroup>
			</S.Field>

			<S.Field gridArea="progress">
				<S.Label htmlFor={progressionField}>Weight progression</S.Label>
				<S.InputWithSelect>
					<S.Input type="text" id={progressionField} name={progressionField} />
					<S.Select>
						<option>kg</option>
						<option>lbs</option>
					</S.Select>
				</S.InputWithSelect>
			</S.Field>
		</S.Fieldset>
	);
}
