import { Request, Response } from "express";
import { getUser } from "./get-user";

/** Request handler that returns the active user, or an error message. */
export async function getMe({ req, res }: { req: Request; res: Response }) {
	if (req.session?.user_id) {
		return res.json({ user: await getUser({ user_id: req.session.user_id }) });
	} else {
		return res.status(401).json({ user: null, message: "No active user." });
	}
}
