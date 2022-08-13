import { Router } from "express";
import { isNewUser } from "../../../types/shared/user.types";
import { destroySession } from "./destroy-session";
import { userExists } from "./get-user";
import { login } from "./log-in";
import { getMe } from "./me";
import { insertUser, parseNewUserForDatabase } from "./register";

export const userRouter = Router({ mergeParams: true });

userRouter.post("/register", async (req, res) => {
	const newUser: any = req.body.newUser;

	if (!isNewUser(newUser)) {
		return res.status(400).json({ message: "Invalid `newUser` in request body." });
	}

	// This check is also done inside `insertUser`, but this way it's easiest to
	// send the correct response type without complicating `insertUser`
	if (await userExists({ username: newUser.username }))
		return res.status(403).json({ message: "Username already taken." });

	const insertedUser = await insertUser({
		userInput: await parseNewUserForDatabase(newUser),
	});

	return res.status(201).json({ user: insertedUser });
});

userRouter.post("/login", async (req, res) => {
	await login(req.body.user, req, res);
});

userRouter.post("/logout", (req, res) => {
	destroySession({ req, res });
});

userRouter.get("/me", async (req, res) => {
	await getMe({ req, res });
});
