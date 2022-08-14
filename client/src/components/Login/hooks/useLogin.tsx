import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { UserLogin } from "../../../types/shared/user.types";
import { isValidUser } from "../helpers/validate";

export default function useLogin() {
	const [user, setUser] = useState<UserLogin>({ username: "", password: "" });
	const isValid = useMemo(() => isValidUser(user), [user]);
	const navigate = useNavigate();

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;
		setUser((cur) => ({ ...cur, [name]: value }));
	}

	const { login } = useAuth();

	return {
		isValid,
		user,
		navigate,
		login,
		handleInputChange,
	} as const;
}
