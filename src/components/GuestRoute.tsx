import { IsLogin } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
	const loggedIn = IsLogin();

	if (loggedIn) {
		return (
			<Navigate
				to="/blogs/featured-blogs"
				replace
			/>
		);
	}

	return <Outlet />;
}
