import styled from "styled-components";
import { activeInputStyle, inputStyle } from "../../helpers/theme/snippets/input";
import { pageStyle } from "../../helpers/theme/snippets/page";
import { SubmitButton } from "../../helpers/theme/snippets/SubmitButton";
import { inputLabelStyle } from "../../helpers/theme/snippets/text";

// TODO: this is the same as the element width from Register.style.tsx. Consider
// making this a snippet value.
const elementWidth = "200px";

export const Form = styled.form`
	${pageStyle}
`;

export const Label = styled.label`
	display: flex;

	${inputLabelStyle};

	width: ${elementWidth};
`;

export const Input = styled.input`
	${inputStyle};
	${activeInputStyle};

	width: ${elementWidth};
`;

export const Button = styled(SubmitButton)`
	margin-top: 1rem;

	width: ${elementWidth};
`;
