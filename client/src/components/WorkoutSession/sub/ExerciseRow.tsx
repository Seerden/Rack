import { ID } from "../../../types/shared/id.types";
import { ExerciseScheme } from "../../../types/shared/session.types";
import * as S from "./ActiveExercise.style";
import RepInput from "./RepInput";

type ExerciseRowProps = {
	exercise_id: ID;
	scheme: ExerciseScheme;
	cycleIndex: () => void;
};

export default function ExerciseRow({
	exercise_id,
	scheme,
	cycleIndex,
}: ExerciseRowProps) {
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
		<S.ExerciseRow
			layout
			key={`m.ExerciseRow-${exercise_id}-${scheme.weight}`}
			transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
		>
			<span>
				{scheme.weight} {scheme.weight_unit} ({scheme.sets} x {scheme.reps})
			</span>

			<S.Reps>{repInputs}</S.Reps>
		</S.ExerciseRow>
	);
}
