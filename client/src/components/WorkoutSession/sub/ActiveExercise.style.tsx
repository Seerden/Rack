import styled from "styled-components";
import { SubTitle } from "../../../helpers/theme/snippets/Title";

export const Action = styled.div`
	display: grid;
	grid-template-columns: minmax(20%, max-content) 1fr;
	justify-content: space-evenly;
	align-items: center;

	* {
		align-items: center;
	}
`;

export const Input = styled.input`
	width: 3rem;

	transition: all 50ms ease-out;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
`;

export const Reps = styled.span`
	display: flex;
	gap: 0.5rem;

	min-height: 2.4rem;
	align-items: center;
`;

export const WarmupForm = styled.form`
	display: flex;
	flex-direction: column;
`;

export const WarmupFields = styled.div`
	display: flex;
	flex-direction: row;
`;

export const Button = styled.button`
	display: flex;
	place-self: flex-end;

	padding: 0.45rem 1.4rem;

	background-color: #ffe600;
	color: black;
	border: 2px solid #ffe600ba;
	font-size: 0.95rem;
	border-radius: 12px;

	&:hover,
	&:active {
		transform: translateY(-2px);
		border-bottom-color: #d8c200;
		box-shadow: 0 0.1rem 0.4rem -0.05rem #d8c200;
	}

	transition: all 25ms linear;
`;

export const Warmup = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const ActiveExercise = styled.section`
	${SubTitle} {
		width: 100%;
		place-self: center;
	}

	margin-top: 2rem;
	background-color: #f5f5f5;
	padding: 1rem 1.5rem;
	border-radius: 9px;
`;

export const ActiveTitle = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
