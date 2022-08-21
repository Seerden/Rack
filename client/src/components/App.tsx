import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../helpers/query-client";
import { theme } from "../helpers/theme/theme";
import AnimatedRoutes from "./AnimatedRoutes";
import NewWorkout from "./Workout/NewWorkout/NewWorkout";

const Register = lazy(() => import("components/Register/Register"));
const Home = lazy(() => import("components/Home/Home"));
const Login = lazy(() => import("components/Login/Login"));
const Header = lazy(() => import("components/Header/Header"));
const Workouts = lazy(() => import("components/Workouts/Workouts"));
const WorkoutSession = lazy(() => import("components/WorkoutSession/WorkoutSession"));

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
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
							<Header />
							<AnimatedRoutes>
								<Route path="/" element={<Home />} />
								<Route
									path="register"
									element={
										<Suspense fallback={<></>}>
											<Register />
										</Suspense>
									}
								/>

								<Route
									path="login"
									element={
										<Suspense fallback={<></>}>
											<Login />
										</Suspense>
									}
								/>

								<Route path="workouts">
									<Route
										key="m.workouts"
										index
										element={
											<Suspense fallback={<></>}>
												<Workouts />
											</Suspense>
										}
									/>
								</Route>

								<Route path="workout">
									<Route path="new" element={<NewWorkout />} />
									<Route path=":workout_id">
										<Route
											key="m.workout.session"
											path="session"
											element={
												<Suspense fallback={<></>}>
													<WorkoutSession />
												</Suspense>
											}
										/>
										<Route path="" element={<></>} />
									</Route>
								</Route>
								<Route path="*" element={<div>404</div>} />
							</AnimatedRoutes>
						</main>
					</Router>
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default App;
