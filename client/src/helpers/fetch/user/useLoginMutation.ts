import { useMutation } from "@tanstack/react-query";
import { User, UserLogin } from "../../../types/shared/user.types";
import { localUser } from "../../auth/user-storage";
import { baseUrl, postConfig } from "../fetch-constants";

async function postLogin(user: UserLogin) {
	return (
		await fetch(`${baseUrl}/user/login`, {
			...postConfig,
			body: JSON.stringify({ user }),
		})
	).json();
}

export default function useLoginMutation() {
	return useMutation<User, any, UserLogin>(["me"], async (user) => postLogin(user), {
		onSuccess: (data) => {
			localUser.set(data);
		},
	});
}
