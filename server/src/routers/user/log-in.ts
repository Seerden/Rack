import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { NewUser } from "../../../types/shared/user.types";
import { destroySession } from "./destroy-session";
import { getUser } from "./get-user";

/**
 * Request handler that logs a user in if provided a valid usernmae/password
 * combination.
 */
export async function login(
	user: Omit<NewUser, "repeat_password">,
	req: Request,
	res: Response
) {
	const foundUser = await getUser({ username: user.username });

	if (foundUser) {
		const passwordMatches = await compare(user.password, foundUser.password_hash);

		if (passwordMatches) {
			req.session.user_id = foundUser.user_id;
			return res.json({ user: foundUser });
		}

		destroySession({ req, res });
		return res.status(401).json({ message: "Invalid credentials" });
	}

	return res.status(404).json({ message: "No user found for given credentials." });
}
