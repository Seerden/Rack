import { FaTimes } from "react-icons/fa";
import { Exercise, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ActiveWorkout } from "../types/workout-state.types";
import * as S from "./SessionLog.style";

type SessionLogProps = {
	workout: WorkoutWithExercises;
	session: ActiveWorkout;
};

export default function SessionLog({ workout, session }: SessionLogProps) {
	return (
		<S.Exercises>
			{workout.exercises.map((e, i) => (
				<LogEntry exercise={e} key={e.exercise_id} isActive={i === 0} />
			))}
		</S.Exercises>
	);
}

type LogEntryProps = {
	exercise: Exercise;
	isActive?: boolean;
};

function LogEntry({ exercise, isActive }: LogEntryProps) {
	return (
		<S.Entry isActive={isActive}>
			<S.Name>{exercise.exercise_name}</S.Name>
			<S.Weight>
				{exercise.starting_weight}
				{exercise.weight_unit}
			</S.Weight>
			<S.RepScheme>
				{exercise.sets} <FaTimes size={11} /> {exercise.reps}
			</S.RepScheme>
		</S.Entry>
	);
}
