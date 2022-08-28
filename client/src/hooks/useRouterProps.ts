import { useLocation, useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function useRouterProps() {
	const params = useParams();
	const navigate = useNavigate();
	const searchParams = useSearchParams();
	const location = useLocation();

	return {
		params,
		searchParams,
		location,
		navigate,
	} as const;
}
