import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, RenderOptions } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../query-client";
import { theme } from "../theme/theme";

const WithProviders = ({ children }: { children: ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<MemoryRouter>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</MemoryRouter>
		</ThemeProvider>
	);
};

const customRender = (ui: React.ReactElement<any>, options?: RenderOptions) =>
	render(ui, { wrapper: WithProviders, ...{ ...(options ?? {}) } });

export * from "@testing-library/react";
export { customRender as render };
