import { motion } from "framer-motion";
import styled from "styled-components";

export const Title = styled(motion.h1)`
	font-size: 1.5rem;
	margin-bottom: 1.2rem;
	font-weight: 600;

	padding: 0.4rem 0.8rem;
	border-radius: 5px;

	border-bottom: 5px solid #eee;

	background-color: #eee;
	max-width: max-content;
`;

// Slightly 'lesser' version of Title
export const SubTitle = styled.h2`
	font-size: 1.35rem;
	margin-bottom: 0.9rem;
	font-weight: 600;

	padding: 0 1.8rem 0.55rem 0.35rem;

	border-bottom: 4px solid #eee;
	max-width: max-content;
`;
