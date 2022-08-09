import { useEffect } from "react";
import { TbCaretLeft } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { NewExercise } from "../../../../types/exercise.types";
import { openIndexState } from "../state/new-workout-state";
import * as S from "./CollapsedExercise.style";

type CollapsedExerciseProps = Partial<NewExercise>;

export default function CollapsedExercise({
	index,
	exercise,
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
					{exercise && exercise?.length > 0 ? exercise : "Unnamed exercise"}
					<TbCaretLeft />
				</S.Summary>
			</S.Details>
		</>
	);
}
