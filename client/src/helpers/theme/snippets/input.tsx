import { css } from "styled-components";
import { inputShadow } from "./shadow";

export const inputStyle = css`
	font-size: 0.88rem;

	border: 3px solid #f1f1f1;
	border-radius: 7px;
	padding: 0.3rem 0.5rem;
	outline: none;

	&:active,
	&:focus {
		border-color: #ddd;
		border-radius: 4px;
	}

	transition: all 45ms ease-out;
`;

export const activeInputStyle = css`
   &:focus,
	&:active {
		${inputShadow};
		transform: translateY(-2px);
	}

`