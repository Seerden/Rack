import { FaTimes } from "react-icons/fa";
import { Exercise } from "../../../../types/shared/exercise.types";
import { ID } from "../../../../types/shared/id.types";
import { SessionExercise } from "../../../../types/shared/session.types";
import { SessionEntriesInput } from "../../types/workout-state.types";
import SetIcon from "../SetIcon";
import * as S from "./SessionLog.style";

type LogEntryProps = {
	exercise: Exercise;
	isActive?: boolean;
	entries?: SessionEntriesInput[number];
	session?: SessionExercise;
	onClick: (id: ID) => void;
};

/**
 * Subcomponent that represents one row (equivalent to one unique `exercise`)
 * in SessionLog.
 */
export default function LogEntry({
	exercise,
	isActive,
	onClick,
	entries,
	session,
}: LogEntryProps) {
	// NOTE: the following logic becomes unstable once we allow users to adjust
	// working weights mid-session.
	const workingScheme = session?.schemes.find((x) => !x.is_warmup);
	const workingWeight = workingScheme?.weight;

	if ((!workingWeight && workingWeight !== 0) || !workingScheme) return <></>;

	const workingSets = entries?.[workingWeight]?.map((x) => x.reps);
	const workingSetsFailed = workingSets?.map(
		(reps) => typeof reps === "number" && reps < workingScheme.reps
	);

	return (
		<S.Entry $isActive={isActive} onClick={() => onClick(exercise.exercise_id)}>
			<S.Name>{exercise.exercise_name}</S.Name>
			<S.Weight>
				{/* FIXME: we want to use weight from session instead of starting_weight */}
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
