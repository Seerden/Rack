import { Router } from "express";
import { NewUser } from "../../../types/user.types";
import { userExists } from "./get-user";
import { insertUser, parseNewUserForDatabase } from "./register";

export const userRouter = Router({ mergeParams: true });

userRouter.post("/register", async (req, res) => {
   const newUser: NewUser = req.body.newUser;

   // This check is also done inside `insertUser`, but this way it's easiest to
   // send the correct response type without complicating `insertUser`
   if (await userExists({ username: newUser.username }))
      res.status(403).json({ message: "Username already taken." });

   const insertedUser = await insertUser({
      userInput: await parseNewUserForDatabase(newUser),
   });

   res.status(201).json({ user: insertedUser });
});
