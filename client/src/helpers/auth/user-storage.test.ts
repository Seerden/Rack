import { User } from "../../types/shared/user.types";
import { localUser } from "./user-storage";

const user: User = {
	created_at: new Date(),
	password_hash: "",
	user_id: 1,
	username: "a",
};

describe("localUser", () => {
	test("gets no user if user not set", () => {
		expect(localUser.get()).toBeUndefined();
	});

	test("sets user and gets it correctly", () => {
		localUser.set(user);

		expect(localUser.get()?.user_id).toEqual(user.user_id);
	});

	test("destroys user properly", () => {
		localUser.set(user);

		expect(localUser.get()?.user_id).toEqual(user.user_id);

		localUser.destroy();

		expect(localUser.get()).toBeUndefined();
	});
});
