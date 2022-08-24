import { motion } from "framer-motion";
import styled from "styled-components";

export const Section = styled(motion.section)`
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: 0.3rem;
`;

export const Text = styled.p`
	padding: 1.55rem;
	border-radius: 4px;

	font-size: 0.89rem;
	color: #333;

	margin-right: 0.3rem;
	margin-bottom: 0.3rem;
	box-shadow: 0.3rem 0.3rem 0 0.1rem seagreen;

	border: 3px solid #209b45;
`;

export const Title = styled.h1`
	position: absolute;
	right: 0.8rem;
	top: 0.5rem;

	display: flex;
	justify-content: flex-end;
`;
