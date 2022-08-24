import { AnimatePresence } from "framer-motion";
import { VscCheckAll } from "react-icons/vsc";
import { fadeInVariants } from "../../../helpers/framer/variants/fade-variants";
import * as S from "./WorkoutCompleted.style";

export default function WorkoutCompleted() {
	return (
		<AnimatePresence>
			<S.Section
				key="m.exerciseCompletedSection"
				variants={fadeInVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<S.Title>
					<VscCheckAll
						fill="#209b45"
						aria-hidden="true"
						aria-label="All exercises completed"
					/>
				</S.Title>

				<S.Text>
					You've completed your working weight sets for all exercises. Make sure to
					save your session once you're sure you logged everything you wanted to log.
				</S.Text>
			</S.Section>
		</AnimatePresence>
	);
}
