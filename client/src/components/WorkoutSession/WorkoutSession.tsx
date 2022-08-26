import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent } from "react";
import { pageVariants } from "../../helpers/framer/variants/page-variants";
import { scaleOutVariants } from "../../helpers/framer/variants/slide-variants";
import { Title } from "../../helpers/theme/snippets/Title";
import useWorkoutSession from "./hooks/useWorkoutSession";
import ActiveExercise from "./sub/ActiveExercise";
import RestTimer from "./sub/RestTimer";
import SessionLog from "./sub/SessionLog";
import WorkoutCompleted from "./sub/WorkoutCompleted";
import * as S from "./WorkoutSession.style";

export default function WorkoutSession() {
	const {
		workout,
		activeExercise,
		setActiveExerciseId,
		activeExerciseId,
		cycleActiveIndex,
		handleSubmit,
		allCompleted,
	} = useWorkoutSession();

	if (!workout?.exercises || !activeExercise) return <></>;

	return (
		<S.Page
			as={motion.div}
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit"
			style={{ overflow: "hidden" }} // needs to be an inline style, otherwise Framer doesn't use it
		>
			<Title>{workout?.name} session</Title>

			<RestTimer />

			<SessionLog
				workout={workout}
				onClick={setActiveExerciseId}
				activeExerciseId={activeExerciseId ?? 0}
			/>

			<ActiveExercise
				key="m.ActiveExercise"
				cycleIndex={cycleActiveIndex}
				workout={workout}
				e={activeExercise}
				weight_unit={workout.weight_unit}
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
