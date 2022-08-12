import { FaPlusCircle, FaSave } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { SubTitle, Title } from "../../../helpers/theme/snippets/Title";
import { WeightUnit } from "../../../types/exercise.types";
import useNewWorkout from "./hooks/useNewWorkout";
import * as S from "./NewWorkout.style";
import { openIndexState, weightUnitState } from "./state/new-workout-state";

export default function NewWorkout() {
	const { elements, dispatch, handleInputChange, handleSubmit } = useNewWorkout();
	const setOpenIndex = useSetRecoilState(openIndexState);
	const setWeightUnit = useSetRecoilState(weightUnitState);

	return (
		<S.Form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<Title>New workout</Title>

			<SubTitle>Workout details</SubTitle>
			<S.MetaField>
				<div>
					<S.Label htmlFor="name">Name</S.Label>
					<S.Input
						id="name"
						name="name"
						type="text"
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div>
					<S.Label htmlFor="weight_unit">Weight unit</S.Label>
					<S.Select
						name="weight_unit"
						onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
					>
						<option value="kg">kg</option>
						<option value="lbs">lbs</option>
					</S.Select>
				</div>
			</S.MetaField>

			<SubTitle>Exercises</SubTitle>
			<S.Exercises>{elements}</S.Exercises>

			<S.ActionBar>
				<S.AddButton
					onClick={(e) => {
						e.preventDefault();
						dispatch("add");
						setOpenIndex(elements.length); // automatically 'open' the just-added element
					}}
				>
					<FaPlusCircle />
					Add another exercise
				</S.AddButton>
				<S.SaveButton>
					<FaSave fill="forestgreen" />
					Save new workout
				</S.SaveButton>
			</S.ActionBar>
		</S.Form>
	);
}
