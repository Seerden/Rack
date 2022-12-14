import { AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaSave } from "react-icons/fa";
import { pageVariants } from "../../../helpers/framer/variants/page-variants";
import { SubTitle, Title } from "../../../helpers/theme/snippets/Title";
import { WeightUnit } from "../../../types/shared/exercise.types";
import useNewWorkout from "./hooks/useNewWorkout";
import * as S from "./NewWorkout.style";

export default function NewWorkout() {
	const {
		elements,
		dispatch,
		handleInputChange,
		handleSubmit,
		isValid,
		setOpenIndex,
		setWeightUnit,
	} = useNewWorkout();

	return (
		<S.Form
			variants={pageVariants}
			initial="hidden"
			style={{ overflow: "hidden" }}
			animate="appear"
			exit="exit"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<Title>New workout</Title>

			<SubTitle>Workout details</SubTitle>
			<S.MetaField as="fieldset">
				<div>
					<S.Label htmlFor="name">Name</S.Label>
					<S.Input
						id="name"
						name="name"
						type="text"
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div>
					<S.Label htmlFor="weight_unit">Weight unit</S.Label>
					<S.Select
						id="weight_unit"
						name="weight_unit"
						onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
					>
						<option value="kg">kg</option>
						<option value="lbs">lbs</option>
					</S.Select>
				</div>
			</S.MetaField>

			<SubTitle>Exercises</SubTitle>
			<S.Exercises>
				<AnimatePresence>{elements}</AnimatePresence>
			</S.Exercises>

			<S.ActionBar>
				<S.AddButton
					onClick={(e) => {
						e.preventDefault();
						dispatch({ type: "add" });
						setOpenIndex(elements.length); // automatically 'open' the just-added element
					}}
				>
					<FaPlusCircle />
					Add another exercise
				</S.AddButton>
				<S.SaveButton disabled={!isValid}>
					<FaSave fill={isValid ? "forestgreen" : "orangered"} />
					{isValid ? "Save new workout" : "Fill out all fields"}
				</S.SaveButton>
			</S.ActionBar>
		</S.Form>
	);
}
