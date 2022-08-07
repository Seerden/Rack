import { Title } from "../../helpers/theme/snippets/Title";
import { isValidNewUser } from "./helpers/validate";
import useRegister from "./hooks/useRegister";
import * as S from "./Register.style";

export default function Register() {
	const { handleChange, handleSubmit, newUser, handlePasswordBlur, message } =
		useRegister();

	return (
		<S.Form>
			<Title>Register an account</Title>

			<S.Label htmlFor="username">Username:</S.Label>
			<S.Input name="username" type="text" onChange={(e) => handleChange(e)} />

			<S.Label htmlFor="password">Password:</S.Label>
			<S.Input
				name="password"
				type="password"
				onChange={(e) => handleChange(e)}
				onBlur={() => handlePasswordBlur()}
			/>

			<S.Label htmlFor="repeatPassword">Repeat password:</S.Label>
			<S.Input
				name="repeatPassword"
				type="password"
				onChange={(e) => handleChange(e)}
				onBlur={() => handlePasswordBlur()}
			/>

			<S.Button
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				disabled={!isValidNewUser(newUser)}
			>
				{!isValidNewUser(newUser) ? "Fill in all fields" : "Register"}
			</S.Button>

			{message && <aside>{message}</aside>}
		</S.Form>
	);
}
