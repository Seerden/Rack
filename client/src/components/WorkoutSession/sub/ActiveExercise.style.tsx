import styled from "styled-components";

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
