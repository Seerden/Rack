import { UserInput } from "../../../types/user.types";
import { sqlConnection } from "../../db/init";
import { getUser } from "./get-user";
import { insertUser } from "./register";

describe("getUser", () => {
   it("returns a just-inserted user", async () => {
      sqlConnection.begin(async (sql) => {
         const newUser: UserInput = {
            username: "Billy",
            password_hash: "this should really be a hash",
         };

         await insertUser({ sql, userInput: newUser });

         const foundUser = await getUser({ sql, username: newUser.username });

         expect(foundUser?.username).toEqual(newUser.username);
         expect(foundUser?.password_hash).toEqual(newUser.password_hash);

         sql`rollback`;
      });
   });

   it("does not return a user that doesn't exist", async () => {
      sqlConnection.begin(async (sql) => {
         const shouldBeUndefined = await getUser({ sql, username: `${Math.random()}` });

         expect(shouldBeUndefined).toBeUndefined();

         sql`rollback`;
      });
   });
});
