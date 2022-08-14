import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import * as S from "./WorkoutCard.style";

type WorkoutCardProps = {
	workout: WorkoutWithExercises;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
	return (
		<S.Card>
			<S.CardTitle>{workout.name}</S.CardTitle>
			<S.ExerciseList>
				{workout.exercises.map((e) => (
					<S.CardExercise key={e.exercise_name}>{e.exercise_name}</S.CardExercise>
				))}
			</S.ExerciseList>
		</S.Card>
	);
}
