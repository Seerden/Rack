import { css } from "styled-components";

export const inputStyle = css`
	font-size: 0.94rem;

	border: 3px solid #f1f1f1;
	padding: 0.2rem 0.5rem;
	outline: none;

	&:active,
	&:focus {
		border-color: #ddd;
		border-radius: 4px;
	}

	transition: all 45ms ease-out;
`;
