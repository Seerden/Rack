import { flex } from "@/helpers/theme/snippets/layout";
import { motion } from "framer-motion";
import styled from "styled-components";

const space = {
   primary: "0.3rem",
   secondary: "0.5rem",
   tertiary: "0.8rem",
} as const;

const colors = {
   main: "seagreen",
   secondary: "#209b45",
} as const;

export const Section = styled(motion.section)`
	position: relative;
	${flex.column};
	margin-top: ${space.primary};
`;

export const Text = styled.p`
	padding: 1.55rem;
	border-radius: 4px;

	font-size: 0.89rem;
	color: #333;

	margin-right: ${space.primary};
	margin-bottom: ${space.primary};
	box-shadow: ${space.primary} ${space.primary} 0 0.1rem ${colors.main};

	border: 3px solid ${colors.secondary};
`;

export const Title = styled.h1`
	position: absolute;
	right: ${space.tertiary};
	top: ${space.secondary};

	display: flex;
	justify-content: flex-end;
`;
