import {
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@heroui/react";
import { NavLink } from "react-router-dom";

export const AcmeLogo = () => {
	return (
		<svg
			fill="none"
			height="36"
			viewBox="0 0 32 32"
			width="36">
			<path
				clipRule="evenodd"
				d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	);
};

export default function MainNav() {
	return (
		<Navbar shouldHideOnScroll={true}>
			<NavbarBrand>
				<AcmeLogo />
				<p className="font-bold text-inherit">PersonalBLOG</p>
			</NavbarBrand>
			<NavbarContent
				className="hidden gap-4"
				justify="center">
				<NavbarItem>
					<Link
						color="foreground"
						href="#">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						aria-current="page"
						href="#">
						Blogs
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color="foreground"
						href="/login">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<NavLink to="/login">Login</NavLink>
				</NavbarItem>
				<NavbarItem>
					<NavLink
						to="/register"
						className="bg-primary-500 text-center text-white px-5 py-1.5 rounded-full">
						Sign Up
					</NavLink>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
