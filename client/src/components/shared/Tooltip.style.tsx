import styled from "styled-components";

export const Tooltip = styled.aside`
	position: absolute;
	top: -0.2rem;
	right: 0;
	z-index: 2;
	background-color: #555555e9;
	color: #fff;
	user-select: none;
	border-radius: 5px;
	border: 1px solid #bbb;
	box-shadow: 0 0.2rem 0.6rem 0 #bbb;
	z-index: 2;

	--color: #ffe800;
	border-bottom-width: 2px;
	border-right-width: 2px;
	border-bottom-color: var(--color);
	border-right-color: var(--color);
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
	margin-right: -0.7rem;
	margin-top: -0.7rem;

	svg {
		fill: orangered;
		transition: all 35ms linear;
	}

	&:hover,
	&:focus {
		box-shadow: 0 0 0.2rem 0 #aaa;
		border-color: orangered;
		background-color: orangered;

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
	text-align: justify;
	word-wrap: break-word;
	font-size: 0.83rem;
	padding: 0.4rem 1.2rem;
`;
