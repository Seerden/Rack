import { UserLogin } from "../../../types/shared/user.types";

export function isValidUser({ username, password }: UserLogin) {
	return username.length > 0 && password.length > 0;
}
