import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import CreatePost from "./pages/blogs/CreatePost";
import FeaturedBlogs from "./pages/blogs/FeaturedBlogs";
import NotFound from "./pages/NotFound";

const routes = [
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				path: "blogs/featured-blogs",
				element: <FeaturedBlogs />,
			},
			{
				path: "blogs/create-post",
				element: <CreatePost />,
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
	{
		path: "*",
		element: <NotFound />,
	},
];

const router = createBrowserRouter(routes);

export default function App() {
	return <RouterProvider router={router} />;
}
