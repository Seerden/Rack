import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../../components/Register/types/new-user.types";
import { User } from "../../../types/user.types";
import { baseUrl } from "../fetch-constants";

// TODO: generalize these fetch functions to prevent duplicating options a
// million times.
async function postRegister(newUser: NewUser) {
	return (
		await fetch(`${baseUrl}/user/register`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ newUser }),
		})
	).json();
}

export default function useRegisterMutation() {
	return useMutation<User, any, NewUser>(["register"], async (newUser) =>
		postRegister(newUser)
	);
}
