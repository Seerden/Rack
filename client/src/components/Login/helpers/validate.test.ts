import { UserLogin } from "../../../types/shared/user.types";
import { isValidUser } from "./validate";

const validUser: UserLogin = {
	username: "Bob",
	password: "hunter2",
};

const invalidUser: UserLogin = {
	username: "",
	password: "hunter2",
};

describe("isValidUser", () => {
	test("validates valid user", () => {
		expect(isValidUser(validUser)).toEqual(true);
	});

	test("doesn't validate invalid user", () => {
		expect(isValidUser(invalidUser)).toEqual(false);
	});
});
