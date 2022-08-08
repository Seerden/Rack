import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { theme } from "../helpers/theme/theme";
import { queryClient } from "../hooks/query-client";
import NewWorkout from "./Workout/NewWorkout/NewWorkout";

const Register = lazy(() => import("components/Register/Register"));

const client = queryClient;

const App = () => {
	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools
				initialIsOpen={false}
				panelProps={{
					style: {
						maxWidth: "40vw",
						bottom: 0,
						left: 0,
					},
				}}
				position="bottom-right"
			/>
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<Router>
						<main>
							<Routes>
								<Route path="/" element={<>Welcome</>} />
								<Route path="register" element={<Register />} />
								<Route path="workout">
									<Route path="new" element={<NewWorkout />} />
								</Route>
								<Route path="*" element={<div>404</div>} />
							</Routes>
						</main>
					</Router>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
