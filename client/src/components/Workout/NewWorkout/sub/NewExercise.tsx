import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { RiDeleteBackLine } from "react-icons/ri";
import { makeDefaultVariantProps } from "../../../../helpers/framer/build-variant-props";
import {
	minimalSlideVariants,
	scaleOutExit,
} from "../../../../helpers/framer/variants/slide-variants";
import Tooltip from "../../../shared/Tooltip";
import { defaultExercise } from "../helpers/constants";
import useNewExercise from "../hooks/useNewExercise";
import * as S from "../NewWorkout.style";

type NewExerciseProps = {
	id: number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onDelete?: (id: number) => void;
};

export default function NewExercise({ id, onChange, onDelete }: NewExerciseProps) {
	const { fields, exercise, isValid, setOpenIdx, collapsed, setNewWorkout, weightUnit } =
		useNewExercise(id);

	const getInputProps = useCallback(
		(field: keyof typeof fields) => ({
			exit: {
				opacity: 0,
				backgroundColor: "rgba(0,0,0,0)",
			},
			defaultValue: exercise[field],
			id: fields[field],
			name: fields[field],
			onChange: (e: ChangeEvent<HTMLInputElement>) => onChange?.(e),
		}),
		[onChange, exercise, fields]
	);

	const [showInfo, setShowInfo] = useState(false);

	return (
		<S.Fieldset
			key={`m.fieldset-${id}`}
			$isValid={isValid}
			style={{ overflow: "hidden", position: "relative" }}
			exit={scaleOutExit}
		>
			<AnimatePresence initial={false}>
				{collapsed && (
					<S.CollapsedContainer $isValid={isValid} data-collapsed={true}>
						<S.Collapsed
							id={`fieldset-${id}`}
							aria-label="Only showing this exercise's name. Click the expand button to show its fields."
							key={`m.name-${id}`}
							aria-expanded={false}
							variants={minimalSlideVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							{exercise.exercise_name?.length ? (
								exercise.exercise_name
							) : (
								<em>Unnamed exercise</em>
							)}
						</S.Collapsed>
						{isValid && (
							<S.Summary
								variants={minimalSlideVariants}
								initial="initial"
								animate="animate"
								exit="exit"
							>
								<S.Datum>
									{exercise.sets} x {exercise.reps} reps
								</S.Datum>
								<S.Datum>
									{exercise.starting_weight} (+
									{exercise.weight_progression}) {weightUnit}
								</S.Datum>
							</S.Summary>
						)}
						<S.ExpandButton
							aria-controls={`fieldset-${id}`}
							onClick={(e) => {
								e.preventDefault();
								setOpenIdx(id);
							}}
							exit={{ opacity: 0, color: "rgba(0,0,0,0)" }}
						>
							Expand
						</S.ExpandButton>
					</S.CollapsedContainer>
				)}
				{!collapsed && (
					<>
						<S.DeleteButton
							title="Delete this exercise"
							onClick={(e) => {
								e.preventDefault();
								onDelete?.(id);
								setNewWorkout((cur) => {
									// Do NOT manipulate the length of .exercises, because
									// that influences rendering.
									const updated = structuredClone(cur);
									updated.exercises[id] = defaultExercise;
									return updated;
								});
							}}
							exit={{ opacity: 0, color: "rgba(0,0,0,0)" }}
						>
							<RiDeleteBackLine size={18} />
						</S.DeleteButton>
						<S.FieldsWrapper
							data-collapsed={false}
							aria-expanded={true}
							id={`fieldset-${id}`}
							as={motion.div}
							key={`m.fields-${id}`}
							{...makeDefaultVariantProps(minimalSlideVariants)}
						>
							<S.Field gridArea="exercise">
								<S.Label htmlFor={fields.exercise_name}>Exercise:</S.Label>
								<S.Input {...getInputProps("exercise_name")} type="text" />
							</S.Field>

							<S.Field gridArea="weight">
								<S.Label htmlFor={fields.starting_weight}>
									Starting weight
								</S.Label>
								<S.InputWithUnit>
									<S.Input {...getInputProps("starting_weight")} type="text" />
									<span>{weightUnit}</span>
								</S.InputWithUnit>
							</S.Field>

							<S.Field gridArea="scheme">
								<S.Label>Rep scheme:</S.Label>
								<S.InputGroup>
									<S.SubField>
										<S.Label htmlFor={fields.sets}>Sets</S.Label>
										<S.Input
											{...getInputProps("sets")}
											type={"number"}
											min={1}
										/>
									</S.SubField>
									<S.Icon>x</S.Icon>
									<S.SubField>
										<S.Label htmlFor={fields.reps}>Reps</S.Label>
										<S.Input
											{...getInputProps("reps")}
											type={"number"}
											min={1}
										/>
									</S.SubField>
								</S.InputGroup>
							</S.Field>

							<S.Field gridArea="progress" style={{ position: "relative" }}>
								<S.Label htmlFor={fields.weight_progression}>
									Weight progression{" "}
									<S.Info
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
									>
										<FaInfo
											title="What is this?"
											size={17}
											onClick={() => setShowInfo(true)}
										/>
									</S.Info>
								</S.Label>
								<AnimatePresence>
									{showInfo && (
										<Tooltip key="m.tooltip" onClose={() => setShowInfo(false)}>
											<S.Highlight>Weight progression</S.Highlight> is the
											amount by which your working weight increases if you hit
											at least your target reps on your final set.
										</Tooltip>
									)}
								</AnimatePresence>
								<S.InputWithUnit>
									<S.Input
										{...getInputProps("weight_progression")}
										type="text"
									/>
									<span>{weightUnit}</span>
								</S.InputWithUnit>
							</S.Field>
						</S.FieldsWrapper>
					</>
				)}
			</AnimatePresence>
		</S.Fieldset>
	);
}
