import { WithSQL } from "../../../types/sql.types";
import { User } from "../../../types/user.types";
import { sqlConnection } from "../../db/init";

/** Check if there is a user with the given `username`. */
export async function userExists({
   sql = sqlConnection,
   username,
}: WithSQL<{ username: string }>) {
   const [user] = await sql<[User?]>`select * from users where username = ${username}`;

   return !!user?.username;
}

/** Get a user by `user_id` or `username`. */
export async function getUser({
   sql = sqlConnection,
   username,
   user_id,
}: WithSQL<{ username?: string; user_id?: number }>) {
   if (!username && !user_id) return;

   const [user] = await sql<[User?]>`select * from users where ${
      user_id ? sql`user_id = ${user_id}` : sql`username = ${username ?? null}`
   }`;

   return user;
}
