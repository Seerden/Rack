import styled from "styled-components";
import { inputShadow } from "./shadow";

export const SubmitButton = styled.button`
	display: flex;
	justify-content: center;
	padding: 0.52rem 0.98rem;

	outline: none;
	border: 2px solid #bbb;
	background-color: inherit;

	font-size: 0.94rem;
	font-weight: 500;

	&:disabled {
		color: #bbb;
	}

	&:not(:disabled) {
		border-color: #aaa;
		box-shadow: 0 0 0.2rem 0 #eee;
		border-radius: 4px;

		&:hover,
		&:active,
		&:focus {
			${inputShadow}
			transform: translateY(-4px);
		}

		&:focus {
			outline: 1px solid black;
		}
	}

	transition: all 45ms ease-out;
`;
