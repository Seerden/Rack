import styled from "styled-components";
import { activeInputStyle, inputStyle } from "../../helpers/theme/snippets/input";
import { pageStyle } from "../../helpers/theme/snippets/page";
import { SubmitButton } from "../../helpers/theme/snippets/SubmitButton";
import { inputLabelStyle } from "../../helpers/theme/snippets/text";

const elementWidth = "200px";

export const Form = styled.form`
	${pageStyle};
`;

export const Label = styled.label`
	display: flex;

	${inputLabelStyle};
`;

export const Input = styled.input`
	width: ${elementWidth};

	${inputStyle};

	${activeInputStyle};
`;

export const Button = styled(SubmitButton)`
	width: ${elementWidth};

	margin-top: 1rem;
`;
