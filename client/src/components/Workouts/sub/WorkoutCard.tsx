import { Link } from "react-router-dom";
import { WorkoutWithExercises } from "../../../types/shared/exercise.types";
import * as S from "./WorkoutCard.style";

type WorkoutCardProps = {
	workout: WorkoutWithExercises;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
	if (!workout.exercises.length) return <></>;

	return (
		<S.Card>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<S.CardTitle>{workout.name}</S.CardTitle>
				<Link to={`/workout/${workout.workout_id}/session`}>Start a workout</Link>
			</div>
			<S.ExerciseList>
				{workout.exercises.map((e) => (
					<S.CardExercise key={e.exercise_name}>{e.exercise_name}</S.CardExercise>
				))}
			</S.ExerciseList>
		</S.Card>
	);
}
