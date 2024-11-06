import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			enabled: true,
			refetchOnMount: true,
			gcTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: true,
		},
	},
});
