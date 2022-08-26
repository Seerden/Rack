import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { Exercise } from "../../../../types/shared/exercise.types";
import { ID } from "../../../../types/shared/id.types";
import type { SessionExercise } from "../../../../types/shared/session.types";
import { activeWorkoutState, sessionEntriesState } from "../../state/workout-state";
import { SessionEntriesInput } from "../../types/workout-state.types";
import SetIcon from "../SetIcon";
import * as S from "./SessionLog.style";

type SessionLogProps = {
	exercises: Exercise[];
	onClick: (id: ID) => void;
	activeExerciseId: ID;
};

export default function SessionLog({
	exercises,
	onClick,
	activeExerciseId,
}: SessionLogProps) {
	const sessionEntries = useRecoilValue(sessionEntriesState);
	const session = useRecoilValue(activeWorkoutState);

	return (
		<S.Exercises as={motion.ul}>
			{exercises.map((e) => (
				<LogEntry
					exercise={e}
					key={e.exercise_id}
					isActive={e.exercise_id === activeExerciseId}
					entries={sessionEntries[e.exercise_id]}
					session={session?.find((s) => s.exercise_id === e.exercise_id)}
					onClick={onClick}
				/>
			))}
		</S.Exercises>
	);
}

type LogEntryProps = {
	exercise: Exercise;
	isActive?: boolean;
	entries: Maybe<SessionEntriesInput[number]>;
	session: Maybe<SessionExercise>;
	onClick: (id: ID) => void;
};

function LogEntry({ exercise, isActive, onClick, entries, session }: LogEntryProps) {
	// NOTE: the following logic becomes unstable once we allow users to adjust
	// working weights mid-session.
	const workingScheme = session?.session.find((x) => !x.is_warmup);
	const workingWeight = workingScheme?.weight;

	if (!workingWeight) return <></>;

	const workingSets = entries?.[workingWeight]?.map((x) => x.reps);
	const workingSetsFailed = workingSets?.map(
		(reps) => typeof reps === "number" && reps < workingScheme.reps
	);

	return (
		<S.Entry
			as={motion.li}
			$isActive={isActive}
			onClick={() => onClick(exercise.exercise_id)}
		>
			<S.Name>{exercise.exercise_name}</S.Name>
			<S.Weight>
				{exercise.starting_weight}
				{exercise.weight_unit}
			</S.Weight>
			<S.RepScheme>
				{exercise.sets} <FaTimes size={11} /> {exercise.reps}
			</S.RepScheme>
			<S.SetIcons>
				{[...Array(workingScheme.sets).keys()]?.map((x, i) => (
					<SetIcon
						key={i}
						failed={!!workingSetsFailed?.[i]}
						passed={(workingSets?.[i] ?? 0) >= workingScheme.reps}
					/>
				))}
			</S.SetIcons>
		</S.Entry>
	);
}
