import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { inputStyle } from "../../../helpers/theme/snippets/input";
import { pageStyle } from "../../../helpers/theme/snippets/page";
import { inputShadow } from "../../../helpers/theme/snippets/shadow";
import { inputLabelStyle } from "../../../helpers/theme/snippets/text";
import { fadeIn } from "./sub/CollapsedExercise.style";

export const Form = styled(motion.form)`
	${pageStyle};
	max-width: max-content;
`;

export const Input = styled.input`
	${inputStyle};

	&[type="text"] {
		width: 100%;
	}

	&[type="number"] {
		width: 5rem;
	}
`;

export const Label = styled.label`
	${inputLabelStyle};
	font-size: 1.1rem;
`;

export const Field = styled.div<{ gridArea?: string }>`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
	justify-content: space-around;

	${(p) =>
		p.gridArea &&
		css`
			grid-area: ${p.gridArea};
		`}

	&:nth-of-type(odd) {
		padding-right: 3rem;
	}
	&:nth-of-type(even) {
		padding-left: 3rem;
		border-left: 2px solid #eee;
	}
`;

export const Select = styled.select`
	height: 100%;
	border: 3px solid transparent;
	background-color: #fff;

	&:active,
	&:focus {
		border-color: #ddd;
		outline: none;
	}
`;

export const MetaField = styled(Field)`
	display: grid;
	grid-template-columns: 1fr max-content;

	div {
		display: flex;
		flex-direction: column;
	}

	background-color: #f3f3f3;
	margin-bottom: 0.5rem;
	border-radius: 8px;
	padding: 0.8rem 1.2rem;

	${Input} {
		max-width: 15rem;
	}

	${Select} {
		max-width: 6rem;
	}
`;

export const InputGroup = styled.span`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
`;

export const SubField = styled.span`
	display: flex;
	flex-direction: column;

	${Label} {
		font-size: 0.82rem;
		padding-bottom: 0.04rem;
		padding-left: 0.2rem;
	}
`;

export const Icon = styled.span`
	align-self: flex-end;
	padding-bottom: 0.5rem;
`;

export const Fieldset = styled.fieldset<{ isValid?: boolean }>`
	outline: none;
	border: none;
	padding: 0.8rem 1rem;

	border-left: 3px solid ${(p) => (p.isValid ? "green" : "orangered")};
	border-radius: ${(p) => (p.isValid ? 5 : 3)}px;

	transition: all 45ms ease-out;

	${inputShadow};

	&:not(:nth-of-type(1)) {
		border-top: 2px solid #ccc;
		margin-top: 1.2rem;
	}

	display: grid;
	grid-template-areas:
		"exercise weight"
		"scheme progress";
	grid-template-columns: repeat(2, 1fr);
	grid-row-gap: 1.3rem;

	animation: ${fadeIn} 145ms ease-in;
`;

export const InputWithUnit = styled.span`
	display: flex;

	${Input} {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		max-width: 5rem;
	}

	span {
		display: flex;
		height: 100%;
		padding: 0.3rem 0.6rem;
		padding-right: 0.75rem;
		align-self: center;
		font-size: 0.88rem;
		background-color: #eee;
		user-select: none;
		border-radius: 0 7px 7px 0;
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.6rem 1.2rem;
	width: 16rem;
	font-size: 0.95rem;

	margin: 0 auto;
	margin-top: 1rem;

	border: 2px solid #aaa;
	border-radius: 6px;
	${inputShadow};
	background-color: inherit;

	&:not(&:disabled) {
		&:hover,
		&:focus {
			box-shadow: 0 0.6rem 0rem -0.5rem #666;

			border-color: #888;
			transform: translateY(-2px);
			background-color: #f3f3f3;
		}
	}

	transition: all 25ms ease-in-out;
`;

const saveWidth = "12rem";

export const AddButton = styled(Button)`
	place-self: center;
`;

export const SaveButton = styled(Button)`
	${(p) =>
		!p.disabled &&
		css`
			border-color: forestgreen;

			&:hover {
				border-color: forestgreen;
			}

			box-shadow: none;
		`}

	width: ${saveWidth};
`;

export const ActionBar = styled.div`
	position: sticky;
	bottom: 0;
	border-radius: 5px;

	display: grid;
	grid-template-columns: 1fr ${saveWidth};
`;

export const Exercises = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.9rem;
`;
