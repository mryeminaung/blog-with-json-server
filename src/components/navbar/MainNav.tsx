import { IsLogin } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Image } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";

export default function MainNav() {
	const navigate = useNavigate();
	const loggedIn = IsLogin();
	const setAuthUser = useAuthStore((state) => state.setAuthUser);

	const handleLogout = () => {
		setAuthUser(null);
	};

	return (
		<Navbar shouldHideOnScroll={true}>
			<NavbarBrand
				className="hover:cursor-pointer flex items-center"
				onClick={() => navigate("/blogs")}>
				<Image
					width={40}
					src="/src/assets/blog_logo.png"
				/>
				<p className="font-bold text-inherit text-xl">PersonalBLOG</p>
			</NavbarBrand>
			<NavbarContent
				className="gap-4"
				justify="center">
				{loggedIn && (
					<>
						<NavbarItem>
							<NavLink
								color="foreground"
								to="/blogs/featured-blogs">
								Home
							</NavLink>
						</NavbarItem>
						<NavbarItem isActive>
							<NavLink
								aria-current="page"
								to="/blogs">
								Blogs
							</NavLink>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
			<NavbarContent justify="end">
				{loggedIn ? (
					<>
						<NavbarItem>
							<Button
								onClick={() => navigate("/blogs/create-post")}
								color="primary"
								variant="solid"
								className="text-center px-5 mr-1">
								Create Post
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Button
								onClick={handleLogout}
								color="primary"
								variant="ghost"
								className="text-center px-5">
								Log Out
							</Button>
						</NavbarItem>
					</>
				) : (
					<>
						<NavbarItem className="hidden lg:flex">
							<NavLink to="/login">Login</NavLink>
						</NavbarItem>
						<NavbarItem>
							<Button
								color="primary"
								variant="ghost"
								className="text-center px-5">
								Sign Up
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
