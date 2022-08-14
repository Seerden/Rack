import useLoginMutation from "../helpers/fetch/user/useLoginMutation";
import useLogoutMutation from "../helpers/fetch/user/useLogoutMutation";
import useMeQuery from "../helpers/fetch/user/useMeQuery";

export default function useAuth() {
	const { mutate: login } = useLoginMutation();
	const { mutate: logout } = useLogoutMutation();

	const { data } = useMeQuery();
	const currentUser = data?.user;

	const isLoggedIn = !!currentUser;

	return {
		login,
		logout,
		isLoggedIn,
		currentUser,
	};
}
