import styled, { css } from "styled-components";

export const Exercises = styled.ul`
	display: flex;
	gap: 0.4rem;
	flex-direction: column;
`;

export const Entry = styled.li<{ isActive?: boolean }>`
	list-style: none;

	width: max-content;
	padding: 0 1rem;
	justify-content: center;
	place-self: center;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	${(p) =>
		p.isActive &&
		css`
			position: relative;
			font-size: 1.4rem;
			font-weight: 700;
			padding: 0.35rem 2.2rem;
			border-radius: 4px;
			box-shadow: 0 0.3rem 1rem -0.25rem #dfdfdf;
			}
		`}

	${(p) =>
		!p.isActive &&
		css`
			padding: 0.2rem 2.4rem;
			color: #999;
			border-radius: 12px;
		`}
`;

export const Name = styled.span`
	display: flex;
	width: 5rem;
	justify-content: center;
`;

export const Weight = styled.span`
	display: flex;
	justify-content: space-between;
	width: 4rem;
`;

export const RepScheme = styled.span`
	display: flex;
	justify-content: space-evenly;
	gap: 0.3rem;
	align-items: center;
`;
