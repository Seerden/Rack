import { useQuery } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
import { User } from "../../../types/user.types";
import { localUser } from "../../auth/user-storage";
import { baseUrl } from "../fetch-constants";

export async function getMe() {
	const response = await fetch(`${baseUrl}/user/me`);
	return response.json();
}

type UserData = Data<"user", Maybe<User>>;

export default function useMeQuery({
	onSuccess,
}: {
	onSuccess?: ({ user }: UserData) => void;
}) {
	return useQuery<UserData>(["me"], async () => getMe(), {
		onSuccess: ({ user }) => onSuccess?.({ user }),
		onError: () => {
			console.log("No user found, destroying local user");
			localUser.destroy();
		},
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}