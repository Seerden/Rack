import { motion } from "framer-motion";
import styled from "styled-components";

export const Tooltip = styled(motion.aside)`
	position: absolute;
	right: 0;
	z-index: 2;
	background-color: #555555e9;
	color: #fff;
	user-select: none;
	border-radius: 5px;
	border: 1px solid #bbb;
	z-index: 2;

	border-left-color: #fff;
	border-bottom-color: #fff;
	border-left-width: 2px;
	border-bottom-width: 2px;
	box-shadow: -0.25rem 0.25rem 0 -0.1rem #666, 0 0.2rem 0.6rem 0 #bbb;
`;

export const Close = styled.button`
	background-color: #fff;
	border: 2px solid #fff;
	outline: none;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;

	place-self: flex-end;
	margin-bottom: 0.3rem;
	float: right;
	margin-left: 0.7rem;
	margin-right: -0.45rem;
	margin-top: -0.45rem;

	svg {
		fill: ${p => p.theme.colors.red.secondary};
		transition: all 35ms linear;
	}

	&:hover,
	&:focus {
		box-shadow: 0 0 0.04rem 0 #000;
		background-color: ${p => p.theme.colors.red.secondary};;

		svg {
			fill: white;
			transform: scale(1.03);
		}
	}

	&:focus {
		outline: 1px solid #666;
	}
`;

export const Text = styled.p`
	max-width: 15rem;
	word-wrap: break-word;
	font-size: 0.83rem;
	padding: 0.4rem 1.1rem;
`;
