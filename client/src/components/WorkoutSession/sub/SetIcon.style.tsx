import styled, { css } from "styled-components";

export const Circle = styled.circle<{ failed?: boolean; passed?: boolean }>`
	fill: #eee;

	${(p) =>
		p.failed &&
		css`
			fill: ${p.theme.colors.red.secondary};;
		`}

	${(p) =>
		p.passed &&
		css`
			fill: ${p.theme.colors.green.main};
		`}
`;
