import styled, { css } from "styled-components";

export const Entry = styled.li<{ isActive?: boolean }>`
	list-style: none;

	width: 100%;
	justify-content: center;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	${(p) =>
		p.isActive &&
		css`
			font-size: 1.4rem;
			font-weight: 700;
		`}

	${(p) =>
		!p.isActive &&
		css`
			color: #999;
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
