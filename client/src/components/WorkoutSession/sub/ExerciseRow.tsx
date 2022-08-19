import { ID } from "../../../types/shared/id.types";
import { ExerciseScheme } from "../../../types/shared/session.types";

import * as S from "./ActiveExercise.style";
import RepInput from "./RepInput";

export default function ExerciseRow({
	exercise_id,
	scheme,
}: {
	exercise_id: ID;
	scheme: ExerciseScheme;
}) {
	// Create a `reps` input for each set.
	const repInputs = [...Array(scheme.sets).keys()].map((i) => (
		<RepInput
			key={`${scheme.weight}-${i}`}
			index={i}
			scheme={scheme}
			exercise_id={exercise_id}
		/>
	));

	return (
		<S.Action>
			<span>
				{scheme.weight}
				{scheme.weight_unit} ({scheme.sets} x {scheme.reps})
			</span>

			<S.Reps>{repInputs}</S.Reps>
		</S.Action>
	);
}
