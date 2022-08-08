/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NewUser } from "../types/new-user.types";
import { isKeyofNewUser, isValidNewUser } from "./validate";

describe("isKeyofNewUser", () => {
	const cases = [
		["username", true],
		["notAValidField", false],
		["PASSWORD", false],
	] as const;

	test.each(cases)("isKeyofNewUser('%s') returns %p", (arg, expected) => {
		expect(isKeyofNewUser(arg)).toBe(expected);
	});
});

describe("isValidNewUser", () => {
	const newUser: NewUser = {};

	const validUser = { ...newUser };
	validUser.username = "Billy Bob";
	validUser.password = "hunter2";
	validUser.repeatPassword = "hunter2";

	test("returns true if passed valid user", () => {
		expect(isValidNewUser(validUser)).toBeTruthy();
	});

	test("returns false if stray key in newUser objects", () => {
		// @ts-ignore
		expect(isValidNewUser({ ...newUser, notAKey: 1 })).toBeFalsy();
	});

	test("returns false if not all fields present", () => {
		expect(isValidNewUser(newUser)).toBeFalsy();
	});

	test("returns false if 0-length strings provided", () => {
		expect(isValidNewUser({ ...validUser, username: "" })).toBeFalsy();
	});

	test("returns false if passwords don't match", () => {
		expect(isValidNewUser({ ...validUser, repeatPassword: "hunter3" })).toBeFalsy();
	});
});
