import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../../components/Register/types/new-user.types";
import { User } from "../../../types/shared/user.types";
import { baseUrl, postConfig } from "../fetch-constants";

export default function useRegisterMutation() {
	// TODO: generalize these fetch functions to prevent duplicating options a
	// million times.
	async function postRegister(newUser: NewUser) {
		return (
			await fetch(`${baseUrl}/user/register`, {
				...postConfig,
				body: JSON.stringify({ newUser }),
			})
		).json();
	}

	return useMutation<User, any, NewUser>({
		mutationKey: ["register"],
		mutationFn: async (newUser) => postRegister(newUser),
	});
}
