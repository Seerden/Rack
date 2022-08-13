import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { UserLogin } from "../../types/shared/user.types";

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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				login(user, {
					onSuccess: ({ user }) => {
						navigate(`/u/${user.username}`);
					},
				});
			}}
		>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					id="username"
					onChange={(e) => handleInputChange(e)}
				/>
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					onChange={(e) => handleInputChange(e)}
				/>
			</div>
			<button disabled={!isValidUser(user)} type="submit">
				Log in
			</button>
		</form>
	);
}
