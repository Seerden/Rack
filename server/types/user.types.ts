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
