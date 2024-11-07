import { css } from "styled-components";

const flexBase = css`
	display: flex;
`;

export const flex = {
	column: css`
		${flexBase};
		flex-direction: column;
	`,
	row: css`
		${flexBase};
		flex-direction: row;
	`,
};
