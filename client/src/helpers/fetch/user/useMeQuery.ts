import { useQuery } from "@tanstack/react-query";
import { Data } from "../../../types/fetch-data";
import { User } from "../../../types/shared/user.types";
import { localUser } from "../../auth/user-storage";
import { baseUrl } from "../fetch-constants";

type UseMeQueryOptions = {
	onSuccess?: ({ user }: UserData) => void;
};

export async function getMe(options?: UseMeQueryOptions) {
	const response = await fetch(`${baseUrl}/user/me`, {
		credentials: "include",
		method: "GET",
	});
	const data = await response.json();

	if (data.user) {
		options?.onSuccess?.({ user: data.user });
	} else {
		localUser.destroy();
	}

	return data;
}

type UserData = Data<"user", Maybe<User>>;

export default function useMeQuery(options?: UseMeQueryOptions) {
	return useQuery<UserData>({
		queryKey: ["me"],
		queryFn: () => getMe(options),
		enabled: true,
		retry: false,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});
}
