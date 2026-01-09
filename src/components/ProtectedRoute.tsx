import AuthLayout from "@/layouts/AuthLayout";
import { IsLogin } from "@/lib/utils";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
	const loggedIn = IsLogin();
	const pathName = useLocation().pathname;

	if (!loggedIn) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	if (loggedIn && pathName == "/") {
		return (
			<Navigate
				to="/featured-blogs"
				replace
			/>
		);
	}

	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
