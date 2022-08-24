import styled from "styled-components";
import { pageStyle } from "../../helpers/theme/snippets/page";
import { SubmitButton } from "../../helpers/theme/snippets/SubmitButton";

export const Page = styled.section`
	${pageStyle}

	display: flex;
	flex-direction: column;
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
