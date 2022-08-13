import { hash } from "bcryptjs";
import { NewUser, User, UserInput } from "../../../types/shared/user.types";
import { WithSQL } from "../../../types/sql.types";
import { sqlConnection } from "../../db/init";
import { userExists } from "./get-user";

/** Parse a raw NewUser (presumably from the client) to a UserInput for database
 * insertion. */
export async function parseNewUserForDatabase(newUser: NewUser): Promise<UserInput> {
	const hashedPassword = await hash(newUser.password, 11);

	const parsedNewUser: UserInput = {
		username: newUser.username,
		password_hash: hashedPassword,
	};

	return parsedNewUser;
}

/** Inserts a UserInput object into the database and returns the inserted user. */
export async function insertUser({
	sql = sqlConnection,
	userInput,
}: WithSQL<{ userInput: UserInput }>) {
	const insertedUser = await sql.begin(async (q) => {
		if (await userExists({ sql: q, username: userInput.username })) return;

		const [insertedUser] = await q<[User?]>`
         insert into users 
         ${q(userInput)}
         returning *
      `;

		return insertedUser;
	});

	return insertedUser;
}
