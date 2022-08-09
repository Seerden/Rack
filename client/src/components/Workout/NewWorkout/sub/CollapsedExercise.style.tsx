import styled, { keyframes } from "styled-components";
import { inputShadow } from "../../../../helpers/theme/snippets/shadow";

export const fadeIn = keyframes`
   0% {
      opacity: 0;
      transform: scaleY(0)
   } 50% {
      opacity: 1;
   }
   100% {
      transform: scaleY(1);
   }
`;

export const Details = styled.details`
	border-radius: 9px;
	padding: 1rem 2rem;
	${inputShadow};

	&:hover {
		background-color: #f3f3f3;

		svg {
			transform: rotate(-0.25turn);

			transition: all 45ms ease;
		}
	}

	transition: all 45ms ease;
`;

export const Summary = styled.summary`
	list-style: none;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	user-select: none;

	animation: ${fadeIn} 145ms ease-in;
	animation-fill-mode: forwards;
`;
