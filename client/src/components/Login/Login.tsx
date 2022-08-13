import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Title } from "../../helpers/theme/snippets/Title";
import useAuth from "../../hooks/useAuth";
import { UserLogin } from "../../types/shared/user.types";
import * as S from "./Login.style";

export default function Login() {
	const [user, setUser] = useState<UserLogin>({ username: "", password: "" });
	const navigate = useNavigate();

	function isValidUser({ username, password }: UserLogin) {
		return username.length > 0 && password.length > 0;
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;
		setUser((cur) => ({ ...cur, [name]: value }));
	}

	const { login } = useAuth();

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
			<S.Button disabled={!isValidUser(user)} type="submit">
				{isValidUser(user) ? "Log in" : "Fill in all fields"}
			</S.Button>
		</S.Form>
	);
}
