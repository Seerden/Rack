import { ChangeEventHandler } from "react";
import useNewExercise from "../hooks/useNewExercise";
import * as S from "../NewWorkout.style";

type NewExerciseProps = {
	index: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default function NewExercise({ index, onChange }: NewExerciseProps) {
	const { fields } = useNewExercise(index);

	return (
		<S.Fieldset>
			<S.Field gridArea="exercise">
				<S.Label htmlFor={fields.exercise}>Exercise:</S.Label>
				<S.Input
					type="text"
					id={fields.exercise}
					name={fields.exercise}
					onChange={(e) => onChange?.(e)}
				/>
			</S.Field>

			<S.Field gridArea="weight">
				<S.Label htmlFor={fields.starting_weight}>Starting weight</S.Label>
				<S.InputWithSelect>
					<S.Input
						type="text"
						id={fields.starting_weight}
						name={fields.starting_weight}
						onChange={(e) => onChange?.(e)}
					/>
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
						<S.Label htmlFor={fields.sets}>Sets</S.Label>
						<S.Input
							id={fields.sets}
							name={fields.sets}
							type={"number"}
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
							type={"number"}
							min={1}
							onChange={(e) => onChange?.(e)}
						/>
					</S.SubField>
				</S.InputGroup>
			</S.Field>

			<S.Field gridArea="progress">
				<S.Label htmlFor={fields.progression}>Weight progression</S.Label>
				<S.InputWithSelect>
					<S.Input
						type="text"
						id={fields.progression}
						name={fields.progression}
						onChange={(e) => onChange?.(e)}
					/>
					<S.Select>
						<option>kg</option>
						<option>lbs</option>
					</S.Select>
				</S.InputWithSelect>
			</S.Field>
		</S.Fieldset>
	);
}
