import styled from "styled-components";

export const Info = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: none;
	border: none;
	outline: none;
	border-radius: 50%;
	background-color: unset;

	transition: all 35ms linear;

	&:focus,
	&:hover {
		svg {
			color: #0079b1;
		}
	}
`;
