import { motion } from "framer-motion";
import { Exercise } from "../../../../types/shared/exercise.types";
import { ID } from "../../../../types/shared/id.types";
import { SessionExercise } from "../../../../types/shared/session.types";
import { SessionEntriesInput } from "../../types/workout-state.types";
import LogEntry from "./LogEntry";
import * as S from "./SessionLog.style";

type SessionLogProps = {
	exercises: Exercise[];
	onClick: (id: ID) => void;
	activeExerciseId: ID;
	session: SessionExercise[];
	sessionEntries: SessionEntriesInput;
};

export default function SessionLog({
	exercises,
	onClick,
	activeExerciseId,
	session,
	sessionEntries,
}: SessionLogProps) {
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
