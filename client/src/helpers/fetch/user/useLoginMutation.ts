import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
import { User, UserLogin } from "../../../types/shared/user.types";
import { localUser } from "../../auth/user-storage";
import { baseUrl, postConfig } from "../fetch-constants";

export default function useLoginMutation() {
	const client = useQueryClient();

	async function postLogin(user: UserLogin) {
		const response = await fetch(`${baseUrl}/user/login`, {
			...postConfig,
			body: JSON.stringify({ user }),
		});
		const data = await response.json();

		if (data.user) {
			localUser.set(data.user);
			client.setQueryData(["me"], user);
		}

		return data;
	}

	return useMutation<Data<"user", User>, any, UserLogin>({
		mutationKey: ["me"],
		mutationFn: async (user) => postLogin(user),
	});
}
