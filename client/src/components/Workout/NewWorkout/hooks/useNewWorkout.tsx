import { useReducer } from "react";
import NewExercise from "../sub/NewExercise";

export default function useNewWorkout() {
	function fieldsetElementReducer(state: JSX.Element[], action: string): JSX.Element[] {
		const rowCount = state.length;

		switch (action) {
			case "add":
				return state.concat(<NewExercise key={rowCount} index={rowCount} />);

			default:
				return state;
		}
	}

	const [elements, dispatch] = useReducer(fieldsetElementReducer, [
		<NewExercise key={0} index={0} />,
	]);

	return { elements, dispatch } as const;
}
