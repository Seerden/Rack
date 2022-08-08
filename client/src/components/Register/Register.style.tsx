import styled from "styled-components";
import { inputStyle } from "../../helpers/theme/snippets/input";
import { pageStyle } from "../../helpers/theme/snippets/page";
import { inputShadow } from "../../helpers/theme/snippets/shadow";
import { inputLabelStyle } from "../../helpers/theme/snippets/text";

const elementWidth = "200px";

export const Form = styled.form`
	${pageStyle};
`;

export const Label = styled.label`
	display: flex;
	flex-direction: column;

	${inputLabelStyle};
`;

export const Input = styled.input`
	width: ${elementWidth};

	${inputStyle};

	&:focus,
	&:active {
		${inputShadow};
		transform: translateY(-2px);
	}
`;

export const Button = styled.button`
	width: ${elementWidth};

	margin-top: 1rem;

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
