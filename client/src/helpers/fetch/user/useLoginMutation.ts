import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
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
	const client = useQueryClient();

	return useMutation<Data<"user", User>, any, UserLogin>(
		["me"],
		async (user) => postLogin(user),
		{
			onSuccess: ({ user }) => {
				localUser.set(user);
				client.setQueryData(["me"], user);
			},
		}
	);
}
