import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../helpers/query-client";
import { theme } from "../helpers/theme/theme";
import AnimatedRoutes from "./AnimatedRoutes";
import Suspended from "./Suspended";

const Header = lazy(() => import("@components/Header/Header"));
const Home = lazy(() => import("@components/Home/Home"));
const Login = lazy(() => import("@components/Login/Login"));
const NewWorkout = lazy(() => import("@components/Workout/NewWorkout/NewWorkout"));
const Register = lazy(() => import("@components/Register/Register"));
const Workouts = lazy(() => import("@components/Workouts/Workouts"));
const WorkoutSessionView = lazy(
	() => import("@components/WorkoutSession/WorkoutSessionView")
);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools
				initialIsOpen={false}
				
				position="bottom"
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
										<Suspended>
											<Register />
										</Suspended>
									}
								/>

								<Route
									path="login"
									element={
										<Suspended>
											<Login />
										</Suspended>
									}
								/>

								<Route path="workouts">
									<Route
										key="m.workouts"
										index
										element={
											<Suspended>
												<Workouts />
											</Suspended>
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
												<Suspended>
													<WorkoutSessionView />
												</Suspended>
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
