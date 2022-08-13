import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../helpers/query-client";
import { theme } from "../helpers/theme/theme";
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
								<Route
									path="/"
									element={
										<>
											Welcome{" "}
											<Link to="/workout/new">Create a new workout</Link>{" "}
										</>
									}
								/>
								<Route
									path="register"
									element={
										<Suspense fallback={<></>}>
											<Register />
										</Suspense>
									}
								/>
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
