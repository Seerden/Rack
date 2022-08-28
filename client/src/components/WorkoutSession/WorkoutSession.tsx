import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent } from "react";
import { pageVariants } from "../../helpers/framer/variants/page-variants";
import { scaleOutVariants } from "../../helpers/framer/variants/slide-variants";
import { Title } from "../../helpers/theme/snippets/Title";
import { WorkoutWithExercises } from "../../types/shared/exercise.types";
import { SessionExercise } from "../../types/shared/session.types";
import useWorkoutSession from "./hooks/useWorkoutSession";
import ActiveExercise from "./sub/ActiveExercise/ActiveExercise";
import RestTimer from "./sub/RestTimer";
import SessionLog from "./sub/SessionLog/SessionLog";
import WorkoutCompleted from "./sub/WorkoutCompleted";
import { SessionEntriesInput } from "./types/workout-state.types";
import * as S from "./WorkoutSession.style";

type WorkoutSessionProps = {
	workout: WorkoutWithExercises;
	session: SessionExercise[];
	sessionEntries: SessionEntriesInput;
};

export default function WorkoutSession({
	workout,
	session,
	sessionEntries,
}: WorkoutSessionProps) {
	const {
		activeExercise,
		activeExerciseId,
		allCompleted,
		cycleActiveIndex,
		handleSubmit,
		setActiveExerciseId,
	} = useWorkoutSession({
		workout,
		session,
		sessionEntries,
	});
	if (!activeExercise) return <></>;

	const { exercises, weight_unit } = workout;

	return (
		<S.Page
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit"
			style={{ overflow: "hidden" }} // needs to be an inline style, otherwise Framer doesn't use it
		>
			<Title>{workout.name} session</Title>

			<RestTimer />

			<SessionLog
				exercises={exercises}
				onClick={setActiveExerciseId}
				activeExerciseId={activeExerciseId ?? 0}
				session={session}
				sessionEntries={sessionEntries}
			/>

			<ActiveExercise
				key="m.ActiveExercise"
				cycleIndex={cycleActiveIndex}
				exercises={exercises}
				e={activeExercise}
				weight_unit={weight_unit}
			/>

			{allCompleted && (
				<AnimatePresence mode="sync" key="m.WorkoutSession">
					<WorkoutCompleted key="m.completed" />
					<AnimatePresence key="m.PresenceEndButton">
						<S.EndButton
							key="m.endButton"
							as={motion.button}
							variants={scaleOutVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							onClick={(e: MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								handleSubmit();
							}}
						>
							Complete session
						</S.EndButton>
					</AnimatePresence>
				</AnimatePresence>
			)}
		</S.Page>
	);
}
