import BlogDetail from "@/components/blog/BlogDetail";
import BlogLayout from "@/layouts/BlogLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import UserLayout from "@/layouts/UserLayout";
import BlogList from "@components/blog/BlogList";
import NewBlog from "@components/blog/NewBlog";
import ChangePassword from "@components/user/ChangePassword";
import Dashboard from "@components/user/Dashboard";
import Settings from "@components/user/Settings";
import SocialProfiles from "@components/user/SocialProfiles";
import RootLayout from "@layouts/RootLayout";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import FeaturedBlogs from "./pages/home/FeaturedBlogs";

import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [],
	},
	{
		path: "/register",
		element: <RegisterForm />,
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<RootLayout />}>
					<Route
						index
						element={<FeaturedBlogs />}
					/>

					<Route
						path="blogs"
						element={<BlogList />}
					/>
					<Route
						path="blogs/:blogId"
						element={<BlogLayout />}>
						<Route
							index
							element={<BlogDetail />}
						/>
					</Route>

					<Route
						path="user"
						element={<UserLayout />}>
						<Route
							path="new-blog"
							element={<NewBlog />}
						/>
						<Route
							path="dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="settings"
							element={<SettingsLayout />}>
							<Route
								index
								element={<Settings />}
							/>
							<Route
								path="change-password"
								element={<ChangePassword />}
							/>
							<Route
								path="social-profiles"
								element={<SocialProfiles />}
							/>
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
