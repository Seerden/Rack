import { NewUser } from "../types/new-user.types";

/**
 * Validate a new user.
 * To be valid, the following conditions need to hold:
 * - contains a `username`, `password` and `repeatPassword`
 * - `password` and `repeatPassword` have to be equal
 */
export function isValidNewUser({ username, password, repeatPassword }: NewUser) {
	return (
		username?.length &&
		password?.length &&
		repeatPassword?.length &&
		password === repeatPassword
	);
}
