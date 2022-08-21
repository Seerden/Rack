import { motion } from "framer-motion";
import { ID } from "../../../types/shared/id.types";
import { ExerciseScheme } from "../../../types/shared/session.types";

import * as S from "./ActiveExercise.style";
import RepInput from "./RepInput";

export default function ExerciseRow({
	exercise_id,
	scheme,
	cycleIndex,
}: {
	exercise_id: ID;
	scheme: ExerciseScheme;
	cycleIndex: () => void;
}) {
	// Create a `reps` input for each set.
	const repInputs = [...Array(scheme.sets).keys()].map((i) => (
		<RepInput
			cycleIndex={cycleIndex}
			key={`${scheme.weight}-${i}`}
			index={i}
			scheme={scheme}
			exercise_id={exercise_id}
		/>
	));

	return (
		<S.Action
			as={motion.div}
			layout
			key={"exercise-row"}
			transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
		>
			<span>
				{scheme.weight}
				{scheme.weight_unit} ({scheme.sets} x {scheme.reps})
			</span>

			<S.Reps>{repInputs}</S.Reps>
		</S.Action>
	);
}
