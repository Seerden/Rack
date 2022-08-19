import { FaTimes } from "react-icons/fa";
import { Exercise, WorkoutWithExercises } from "../../../types/shared/exercise.types";
import { ID } from "../../../types/shared/id.types";
import * as S from "./SessionLog.style";

type SessionLogProps = {
	workout: WorkoutWithExercises;
	onClick: (id: ID) => void;
	activeExerciseId: ID;
};

export default function SessionLog({
	workout,
	onClick,
	activeExerciseId,
}: SessionLogProps) {
	return (
		<S.Exercises>
			{workout.exercises.map((e, i) => (
				<LogEntry
					exercise={e}
					key={e.exercise_id}
					isActive={e.exercise_id === activeExerciseId}
					onClick={onClick}
				/>
			))}
		</S.Exercises>
	);
}

type LogEntryProps = {
	exercise: Exercise;
	isActive?: boolean;
	onClick: (id: ID) => void;
};

function LogEntry({ exercise, isActive, onClick }: LogEntryProps) {
	return (
		<S.Entry isActive={isActive} onClick={() => onClick(exercise.exercise_id)}>
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
