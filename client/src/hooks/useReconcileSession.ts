import { useEffect } from "react";
import { localUser } from "../helpers/auth/user-storage";
import useMeQuery from "../helpers/fetch/user/useMeQuery";
import useAuth from "./useAuth";

/** Reconcile client-side authentication state with server-side state. */
export default function useReconcileSession() {
	const { logout } = useAuth();
	const { refetch: fetchMe } = useMeQuery({
		onSuccess: ({ user }) => {
			const localMe = localUser.get();

			if (!user) {
				if (localMe) {
					return logout();
				}
			} else {
				if (user !== localMe) {
					localUser.set(user);
				}
			}
		},
	});

	useEffect(() => {
		fetchMe({});
	}, []);
}
