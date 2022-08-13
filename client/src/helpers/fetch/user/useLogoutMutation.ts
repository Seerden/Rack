import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl, postConfig } from "../fetch-constants";

async function postLogout() {
	return (
		await fetch(`${baseUrl}/user/logout`, {
			...postConfig,
		})
	).json();
}

export default function useLogoutMutation() {
	const client = useQueryClient();

	return useMutation(["logout"], async () => postLogout(), {
		// Unset local user on successful logout.
		onSuccess: () => {
			client.removeQueries(["me"]);
		},
	});
}
