import { useEffect } from "react";
import { TbCaretLeft } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { NewExercise } from "../../../../types/shared/exercise.types";
import { openIndexState } from "../state/new-workout-state";
import * as S from "./CollapsedExercise.style";

type CollapsedExerciseProps = Partial<NewExercise>;

export default function CollapsedExercise({
	index,
	isValid,
	...exercise
}: CollapsedExerciseProps & { index: number; isValid?: boolean }) {
	const [openIndex, setOpenIndex] = useRecoilState(openIndexState);

	useEffect(() => {
		console.log({ openIndex });
	}, [openIndex]);

	return (
		<S.Details
			isValid={isValid}
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
				{exercise.exercise_name && exercise.exercise_name?.length > 0
					? exercise.exercise_name
					: "Unnamed exercise"}
				<TbCaretLeft />
			</S.Summary>
		</S.Details>
	);
}
