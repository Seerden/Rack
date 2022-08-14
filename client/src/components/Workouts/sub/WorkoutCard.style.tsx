import styled from "styled-components";
import { pageShadow } from "../../../helpers/theme/snippets/shadow";

export const Card = styled.li`
	list-style: none;
	min-width: 100%;
	width: max-content;
	padding: 0.3rem 1.2rem;

	${pageShadow};
	border: 2px solid #dfdfdf;

	&:not(:nth-of-type(1)) {
		margin-top: 1.2rem;
	}
`;

export const CardTitle = styled.h1`
	font-size: 1.3rem;
	text-decoration: none;
	width: max-content;
	padding: 0.4rem 1.2rem;
	margin-top: -1rem;
	margin-bottom: 0.3rem;
	border-radius: 4px;
	background-color: #303030;
	color: #eee;
`;

export const CardExercise = styled.li`
	list-style: none;
	padding: 0.3rem 0.7rem;
	border-radius: 8px;
	border: 1px solid #efefef;
	width: max-content;
`;

export const ExerciseList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	gap: 0.7rem;
	justify-content: space-around;
`;
