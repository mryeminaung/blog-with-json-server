import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import FeaturedBlogs from "./pages/blogs/FeaturedBlogs";

const routes = [
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: <FeaturedBlogs />,
			},
			{
				path: "blogs/featured-blogs",
				element: <FeaturedBlogs />,
			},
		],
	},
	{
		element: <GuestRoute />,
		children: [
			{
				path: "register",
				element: <RegisterForm />,
			},
			{
				path: "login",
				element: <LoginForm />,
			},
		],
	},
];

const router = createBrowserRouter(routes);

export default function App() {
	return <RouterProvider router={router} />;
}
