import styled, { keyframes } from "styled-components";
import { inputShadow } from "../../../../helpers/theme/snippets/shadow";

export const fadeIn = keyframes`
   0% {
      opacity: 0;
      transform: translateX(-200px);
   } 50% {
      opacity: 1;
   }
   100% {
      transform: translateX(0);
   }
`;

export const Details = styled.details`
	margin-bottom: 0.6rem;
	padding: 1rem 2rem;
	${inputShadow};

	&:hover {
		background-color: #f3f3f3;

		svg {
			transform: rotate(-0.25turn);

			transition: all 45ms ease;
		}
	}
`;

export const Summary = styled.summary`
	list-style: none;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	user-select: none;

	animation: ${fadeIn} 110ms ease-out;
	animation-fill-mode: forwards;
`;
