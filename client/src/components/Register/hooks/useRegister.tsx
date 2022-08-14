import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useCallback, useState } from "react";
import useRegisterMutation from "../../../helpers/fetch/user/useRegisterMutation";
import { isKeyofNewUser, isValidNewUser } from "../helpers/validate";
import { NewUser } from "../types/new-user.types";

const defaultNewUser: NewUser = {};

export default function useRegister() {
	const [newUser, setNewUser] = useState<NewUser>(defaultNewUser);
	const [message, setMessage] = useState<string | null>();
	const { mutate } = useRegisterMutation();
	const client = useQueryClient();

	/** Update newUser using input's name and value. */
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget; // `name` should be keyof NewUser

		if (!isKeyofNewUser(name)) return false;

		setNewUser((current) => ({
			...current,
			[name]: value,
		}));
	}

	/** Perform the registration mutation. */
	const handleSubmit = useCallback(() => {
		if (!isValidNewUser(newUser)) return;

		mutate(newUser, {
			onSuccess: (data) => {
				client.setQueryData(["me"], data);
				// TODO: also log user in once authentication is fully implemented
			},
		});
	}, [newUser]);

	/** Set message state when passwords don't match. Can be used to
	 * conditionally render a toast with message contents. */
	const handlePasswordBlur = useCallback(() => {
		const { password, repeatPassword } = newUser;

		if (password?.length && repeatPassword?.length && password !== repeatPassword) {
			setMessage("Passwords don't match");
		}
	}, [newUser]);

	return {
		handleChange,
		handleSubmit,
		handlePasswordBlur,
		message,
		newUser,
	} as const;
}
