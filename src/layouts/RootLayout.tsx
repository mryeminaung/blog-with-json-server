import MainNav from "@/components/navbar/MainNav";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<>
			<MainNav />
			<main className="border mx-auto px-5">
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
