import styled, { css } from "styled-components";

export const Circle = styled.circle<{ failed?: boolean; passed?: boolean }>`
	fill: #eee;

	${(p) =>
		p.failed &&
		css`
			fill: orangered;
		`}

	${(p) =>
		p.passed &&
		css`
			fill: forestgreen;
		`}
`;
