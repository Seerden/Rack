import { User } from "../../types/user.types";
import { localUser } from "./user-storage";

const user: User = {
	created_at: 1,
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

		expect(localUser.get()).toEqual(user);
	});

	test("destroys user properly", () => {
		localUser.set(user);

		expect(localUser.get()).toEqual(user);

		localUser.destroy();

		expect(localUser.get()).toBeUndefined();
	});
});
