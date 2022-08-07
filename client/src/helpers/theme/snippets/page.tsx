import { css } from "styled-components";
import { pageBorder } from "./border";

export const pageStyle = css`
	max-width: 500px;
	margin: 0 auto;
	margin-top: 1rem;
	padding: 1.2rem 1.6rem;

	${pageBorder};
`;
