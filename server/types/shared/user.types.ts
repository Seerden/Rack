export type NewUser = {
	password: string;
	repeatPassword: string;
	username: string;
};

export type UserInput = {
	password_hash: string;
	username: string;
};

// Corresponds to `users` table in the database.
export interface User extends UserInput {
	user_id: number;
	created_at: number;
}

export function isNewUser(newUser: any): newUser is NewUser {
	return typeof newUser.username === "string" && typeof newUser.password === "string";
}

export type WithUserId<T> = T & { user_id: User["user_id"] };
