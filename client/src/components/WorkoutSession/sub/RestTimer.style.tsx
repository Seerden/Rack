import styled, { css } from "styled-components";

export const Timer = styled.div`
	width: 250px;
	height: 250px;
	border-radius: 50%;
	padding: 1rem;
	display: flex;
	align-items: center;
`;

export const Circle = styled.circle`
	transition: fill 45ms linear;

	&:nth-of-type(1) {
		-webkit-filter: drop-shadow(-0.2rem 0rem 0.5rem #ccc);
		filter: drop-shadow(-0.2rem 0rem 0.5rem #ccc);
	}
`;

export const SVG = styled.svg`
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
	place-self: center;
`;

export const Text = styled.text<{ pastDue?: boolean }>`
	transform-origin: 50% 50%;

	user-select: none;

	&:nth-of-type(1) {
		font-weight: 700;
		font-size: 1.5rem;
	}

	&:nth-of-type(2) {
		font-weight: 400;
		font-size: 1rem;
	}

	${(p) =>
		p.pastDue &&
		css`
			fill: forestgreen;
		`}

	transform: rotate(90deg);

	transition: all 50ms linear;
`;

export const Group = styled.g`
	&:hover {
		${Circle} {
			stroke-width: 5px;
		}
	}

	transition: all 55ms linear;
`;
