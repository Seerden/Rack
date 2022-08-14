import styled from "styled-components";
import { pageStyle } from "../../helpers/theme/snippets/page";

export const Page = styled.section`
	${pageStyle};
`;

export const WorkoutList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	gap: 1rem;
`;

export const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	min-width: 100%;
`;
