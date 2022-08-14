import useLoginMutation from "../helpers/fetch/user/useLoginMutation";
import useLogoutMutation from "../helpers/fetch/user/useLogoutMutation";

export default function useAuth() {
	const { mutate: login, data: currentUser } = useLoginMutation();
	const { mutate: logout } = useLogoutMutation();

	const isLoggedIn = !!currentUser;

	return {
		login,
		logout,
		isLoggedIn,
		currentUser,
	};
}