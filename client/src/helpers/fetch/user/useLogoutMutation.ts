import { useMutation, useQueryClient } from "@tanstack/react-query";
import { localUser } from "../../auth/user-storage";
import { baseUrl, postConfig } from "../fetch-constants";

export default function useLogoutMutation() {
	const client = useQueryClient();

	async function postLogout() {
		const response = await fetch(`${baseUrl}/user/logout`, {
			...postConfig,
		});
		const data = await response.json();

		if (data) {
			localUser.destroy();
			client.removeQueries({ queryKey: ["me"] });
		}
		return data;
	}

	return useMutation({
		mutationKey: ["logout"],
		mutationFn: postLogout,
	});
}
