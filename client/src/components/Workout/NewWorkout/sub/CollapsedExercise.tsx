import { useEffect } from "react";
import { TbCaretLeft } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { NewExercise } from "../../../../types/server/exercise.types";
import { openIndexState } from "../state/new-workout-state";
import * as S from "./CollapsedExercise.style";

type CollapsedExerciseProps = Partial<NewExercise>;

export default function CollapsedExercise({
	index,
	exercise_name,
	sets,
	reps,
	starting_weight,
}: CollapsedExerciseProps & { index: number }) {
	const [openIndex, setOpenIndex] = useRecoilState(openIndexState);

	useEffect(() => {
		console.log({ openIndex });
	}, [openIndex]);

	return (
		<>
			<S.Details
				onClick={(e) => {
					e.stopPropagation();
					setOpenIndex(index);
				}}
			>
				<S.Summary
					onClick={(e) => {
						e.stopPropagation();
						setOpenIndex(index);
					}}
				>
					{exercise_name && exercise_name?.length > 0
						? exercise_name
						: "Unnamed exercise"}
					<TbCaretLeft />
				</S.Summary>
			</S.Details>
		</>
	);
}
