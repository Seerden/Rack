import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { Exercise } from "../../../../types/shared/exercise.types";
import { ID } from "../../../../types/shared/id.types";
import { activeWorkoutState, sessionEntriesState } from "../../state/workout-state";
import LogEntry from "./LogEntry";
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
