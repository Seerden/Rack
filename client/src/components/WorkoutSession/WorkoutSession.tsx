import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useState } from "react";
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
		allCompleted,
	} = useWorkoutSession();

	const [showFinalize, setShowFinalize] = useState<boolean>(false);

	if (!workout?.exercises || !activeExercise) return <></>;

	return (
		<S.Page
			as={motion.div}
			variants={pageVariants}
			initial="hidden"
			animate="appear"
			exit="exit"
			style={{ overflow: "hidden" }}
		>
			<Title as={motion.h1}>{workout?.name} session</Title>

			<RestTimer />

			{!showFinalize && (
				<SessionLog
					workout={workout}
					onClick={setActiveExerciseId}
					activeExerciseId={activeExerciseId ?? 0}
				/>
			)}

			{showFinalize && <div></div>}

			{!showFinalize && !!activeExercise && (
				<ActiveExercise
					key="m.ActiveExercise"
					cycleIndex={cycleActiveIndex}
					workout={workout}
					e={activeExercise}
					// TODO: consider adding weight_unit to workout in addition to
					// including it in each exercise
					weight_unit={workout.exercises[0].weight_unit}
				/>
			)}

			{allCompleted && (
				<AnimatePresence mode="sync" key="m.WorkoutSession">
					<WorkoutCompleted key="m.completed" />
					<AnimatePresence key="m.PresendEndButton">
						<S.EndButton
							key="m.endButton"
							as={motion.button}
							variants={scaleOutVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							onClick={(e: MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
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
