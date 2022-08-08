import { FaPlusCircle, FaSave } from "react-icons/fa";
import { SubTitle, Title } from "../../../helpers/theme/snippets/Title";
import useNewWorkout from "./hooks/useNewWorkout";
import * as S from "./NewWorkout.style";

export default function NewWorkout() {
	const { elements, dispatch } = useNewWorkout();

	return (
		<S.Form>
			<Title>New workout</Title>

			<SubTitle>Workout details</SubTitle>
			<S.NameField>
				<S.Label htmlFor="name">Name</S.Label>
				<S.Input id="name" name="name" type="text" />
			</S.NameField>

			<SubTitle>Exercises</SubTitle>
			{elements}

			<S.ActionBar>
				<S.AddButton
					onClick={(e) => {
						e.preventDefault();
						dispatch("add");
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
