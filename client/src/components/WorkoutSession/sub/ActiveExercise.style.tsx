import styled from "styled-components";
import { SubTitle } from "../../../helpers/theme/snippets/Title";

export const Action = styled.div`
	&:nth-of-type(1) {
		margin-top: 0.8rem;
	}

	display: grid;
	grid-template-columns: 8rem 1fr;
	justify-content: space-evenly;
	align-items: center;
	gap: 1rem;

	* {
		align-items: center;
	}

	padding: 0.34rem 0.69rem;

	&:not(:nth-of-type(1)) {
		border-top: 2px solid #fefefe;
	}

	@media screen and (max-width: 320px) {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		align-items: flex-start;
	}
`;

export const Input = styled.input`
	width: 2.9rem;
	height: 2rem;
	padding: 0.4rem;
	border-radius: 9px;
	text-align: center;
	justify-content: center;
	font-size: 0.93rem;

	transition: all 50ms ease-out;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;

	border: 2px solid #eee;
	outline: 1px solid transparent;

	&:focus,
	&:active {
		outline: 1px solid white;
		box-shadow: 0 0.2rem 0 0 #ffe800;
		transform: translateY(-2px);
	}
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

	padding: 1.3rem 2rem;

	@media screen and (max-width: 320px) {
		padding: 0.4rem 0.6rem;
	}

	box-shadow: 6px 6px 0 -2px #ccc, -6px -6px 0 -2px white;
	border: 3px solid #ffe800;
	border-radius: 8px;
	background-color: #fefefe;
`;

export const WarmupFields = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;

	@media screen and (max-width: 320px) {
		flex-direction: column;
	}

	p {
		* {
			font-size: 0.98rem;
			line-height: 0.98rem;
		}

		label {
			margin-bottom: 0.2rem;
			font-size: 1rem;
			padding-bottom: 0.1rem;
		}

		display: flex;
		flex-direction: column;
		min-width: max-content;
	}
`;

export const Button = styled.button`
	display: flex;
	place-self: flex-end;

	padding: 0.45rem 1.4rem;

	@media screen and (max-width: 320px) {
		padding: 0.25rem 0.7rem;
	}

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

	transform-origin: 95% 50%;
	transition: all 25ms linear;
`;

export const SaveButton = styled.button`
	display: flex;
	width: max-content;
	padding: 0.5rem 0.6rem;
	margin-right: 0.4rem;
	height: max-content;
	margin-left: auto;
	align-self: flex-end;
	background-color: #ffe800;
	border: 1px solid #eee;
	outline: none;
	border-radius: 50%;

	&:hover,
	&:focus {
		border-radius: 12px;
		box-shadow: 0 0.8rem 0.2rem -0.75rem #a1930fb9;
		padding: 0.5rem 1rem;
		margin-right: 0;
		transform: translateY(-2px);
	}

	transition: all 35ms ease-out;
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

	background-color: #f5f5f5;
	padding: 1rem 1.5rem;
	border-radius: 9px;
`;

export const ActiveTitle = styled.header`
	display: flex;
	height: 2.4rem;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;

	@media screen and (max-width: 320px) {
		flex-direction: column;
		align-items: flex-start;

		button {
			align-self: flex-end;
		}
	}
`;

export const WarmUpLabel = styled.h1`
	user-select: none;

	@media screen and (min-width: 320px) {
		margin-left: -0.8rem;
	}

	margin-bottom: 0.2rem;
	font-weight: 400;
	font-size: 1.08rem;
`;
