import styled from "styled-components";
import { pageStyle } from "../../helpers/theme/snippets/page";

export const Page = styled.section`
	${pageStyle};
`;

export const WorkoutList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	gap: 1rem;

	justify-content: space-evenly;
`;

export const Header = styled.header`
	display: flex;
	min-width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
