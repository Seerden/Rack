import { Title } from "../../helpers/theme/snippets/Title";
import useWorkoutSession from "./hooks/useWorkoutSession";
import * as S from "./WorkoutSession.style";

export default function WorkoutSession() {
	useWorkoutSession();

	return (
		<S.Page>
			<Title>{} session</Title>
		</S.Page>
	);
}
