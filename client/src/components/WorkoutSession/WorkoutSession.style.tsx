import { flex } from "@/helpers/theme/snippets/layout";
import { motion } from "framer-motion";
import styled from "styled-components";
import { pageStyle } from "../../helpers/theme/snippets/page";
import { SubmitButton } from "../../helpers/theme/snippets/SubmitButton";

export const Page = styled(motion.section)`
	${pageStyle};

	${flex.column};
`;

export const EndButton = styled(SubmitButton)`
	max-width: max-content;
	place-self: flex-end;
	margin-top: 0.8rem;

	border-color: #ccc;

	&:focus,
	&:hover {
		transform: translateY(
			-1px
		) !important; // needs to be important to overwrite AnimatePresence
	}
`;
