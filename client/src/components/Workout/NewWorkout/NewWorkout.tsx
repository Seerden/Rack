import { FaPlusCircle, FaSave } from "react-icons/fa";
import { Title } from "../../../helpers/theme/snippets/Title";
import useNewWorkout from "./hooks/useNewWorkout";
import * as S from "./NewWorkout.style";

export default function NewWorkout() {
	const { elements, dispatch } = useNewWorkout();

	return (
		<S.Form>
			<Title>New workout</Title>

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
