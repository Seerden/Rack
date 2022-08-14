import { Title } from "../../helpers/theme/snippets/Title";
import useLogin from "./hooks/useLogin";
import * as S from "./Login.style";

export default function Login() {
	const { handleInputChange, user, isValid, login, navigate } = useLogin();

	return (
		<S.Form
			onSubmit={(e) => {
				e.preventDefault();
				login(user, {
					onSuccess: ({ user }) => {
						navigate(`/u/${user.username}`);
					},
				});
			}}
		>
			<Title>Log in</Title>

			<div>
				<S.Label htmlFor="username">Username</S.Label>
				<S.Input
					type="text"
					name="username"
					id="username"
					onChange={(e) => handleInputChange(e)}
				/>
			</div>

			<div>
				<S.Label htmlFor="password">Password</S.Label>
				<S.Input
					type="password"
					name="password"
					id="password"
					onChange={(e) => handleInputChange(e)}
				/>
			</div>
			<S.Button disabled={!isValid} type="submit">
				{isValid ? "Log in" : "Fill in all fields"}
			</S.Button>
		</S.Form>
	);
}
