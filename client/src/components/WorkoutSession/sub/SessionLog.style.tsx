import styled, { css } from "styled-components";

export const Exercises = styled.ul`
	display: flex;
	gap: 0.4rem;
	flex-direction: column;
	margin-bottom: 1rem;
`;

export const Entry = styled.li<{ $isActive?: boolean }>`
	user-select: none;
	list-style: none;

	width: max-content;
	padding: 0 1rem;
	justify-content: center;
	place-self: center;

	display: flex;
	flex-direction: row;
	gap: 1rem;

	padding: 0.42rem 2.2rem;

	border: 2px solid transparent;
	border-radius: 12px;

	align-items: center;

	${(p) =>
		p.$isActive &&
		css`
			font-weight: 600;
         border-color: #f1f1f1;
			box-shadow: 0 0.3rem 1rem -0.25rem #dfdfdf;
			}
		`}

	${(p) =>
		!p.$isActive &&
		css`
			color: #999;

			&:hover {
				box-shadow: 0 0.3rem 0.4rem -0.2rem #ccc;
				background-color: #fafafa;
				color: black;
			}
		`}

      transition: all 55ms linear;
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

export const SetIcons = styled.span`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	gap: 0.3rem;
	min-width: 5rem;
	align-items: center;
	flex-wrap: wrap;

	svg circle {
		flex-grow: 1;
		place-self: center;
	}
`;
