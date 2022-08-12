import { FaPlusCircle, FaSave } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { SubTitle, Title } from "../../../helpers/theme/snippets/Title";
import useNewWorkout from "./hooks/useNewWorkout";
import * as S from "./NewWorkout.style";
import { openIndexState } from "./state/new-workout-state";

export default function NewWorkout() {
	const { elements, dispatch, handleInputChange, handleSubmit } = useNewWorkout();
	const setOpenIndex = useSetRecoilState(openIndexState);

	return (
		<S.Form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<Title>New workout</Title>

			<SubTitle>Workout details</SubTitle>
			<S.NameField>
				<S.Label htmlFor="name">Name</S.Label>
				<S.Input
					id="name"
					name="name"
					type="text"
					onChange={(e) => handleInputChange(e)}
				/>
			</S.NameField>

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
