import { NewUser } from "../types/new-user.types";

/**
 * Validate a new user.
 * To be valid, the following conditions need to hold:
 * - contains a `username`, `password` and `repeatPassword`
 * - `password` and `repeatPassword` have to be equal
 */
export function isValidNewUser(newUser: NewUser) {
	const { username, password, repeatPassword } = newUser;

	return (
		Object.keys(newUser).every((key) => isKeyofNewUser(key)) &&
		username?.length &&
		password?.length &&
		repeatPassword?.length &&
		password === repeatPassword
	);
}

/** Verify that a string is a key of NewUser. */
export function isKeyofNewUser(s: string): s is keyof NewUser {
	const keys = ["username", "password", "repeatPassword"];

	return keys.includes(s);
}
