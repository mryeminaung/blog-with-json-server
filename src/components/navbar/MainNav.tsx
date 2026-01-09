import { IsLogin } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@heroui/navbar";
import { Button, Image } from "@heroui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserMenu from "../UserMenu";

export default function MainNav() {
	const navigate = useNavigate();
	const loggedIn = IsLogin();
	const setAuthUser = useAuthStore((state) => state.setAuthUser);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const handleLogout = () => {
		setAuthUser(null);
		setIsMenuOpen(false);
	};

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={isMenuOpen}
			shouldHideOnScroll>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden hover:cursor-pointer" // Only shows on mobile
				/>
				<NavbarBrand
					className="hover:cursor-pointer flex items-center gap-2"
					onClick={() => navigate("/blogs")}>
					<Image
						width={50}
						src="/src/assets/blog_logo.png"
					/>
					<p className="font-bold text-inherit text-xl hidden xs:block">
						PersonalBLOG
					</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex gap-8"
				justify="center">
				{loggedIn && (
					<>
						<NavbarItem>
							<NavLink
								to="/featured-blogs"
								className={({ isActive }) =>
									isActive ? "text-primary font-semibold" : "text-foreground"
								}>
								Home
							</NavLink>
						</NavbarItem>
						<NavbarItem>
							<NavLink
								to="/blogs"
								className={({ isActive }) =>
									isActive ? "text-primary font-semibold" : "text-foreground"
								}>
								Blogs
							</NavLink>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			<NavbarContent justify="end">
				<UserMenu />
			</NavbarContent>

			<NavbarMenu>
				{loggedIn ? (
					<>
						<NavbarMenuItem>
							<NavLink
								to="/featured-blogs"
								onClick={() => setIsMenuOpen(false)}
								className="w-full text-lg py-2 block">
								Home
							</NavLink>
						</NavbarMenuItem>
						<NavbarMenuItem>
							<NavLink
								to="/blogs"
								onClick={() => setIsMenuOpen(false)}
								className="w-full text-lg py-2 block">
								Blogs
							</NavLink>
						</NavbarMenuItem>
						<hr className="my-2 border-gray-100" />
						<NavbarMenuItem>
							<Button
								onPress={() => {
									navigate("/blogs/create-post");
									setIsMenuOpen(false);
								}}
								color="primary"
								className="w-full mb-2">
								Create Post
							</Button>
						</NavbarMenuItem>
						<NavbarMenuItem>
							<Button
								onPress={handleLogout}
								variant="bordered"
								color="danger"
								className="w-full">
								Log Out
							</Button>
						</NavbarMenuItem>
					</>
				) : (
					<>
						<NavbarMenuItem>
							<NavLink
								to="/login"
								onClick={() => setIsMenuOpen(false)}>
								Login
							</NavLink>
						</NavbarMenuItem>
						<NavbarMenuItem>
							<NavLink
								to="/register"
								onClick={() => setIsMenuOpen(false)}>
								Sign Up
							</NavLink>
						</NavbarMenuItem>
					</>
				)}
			</NavbarMenu>
		</Navbar>
	);
}
