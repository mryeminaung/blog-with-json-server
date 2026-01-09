import useAuthStore from "@/stores/useAuthStore";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
	const authUser = useAuthStore((state) => state.authUser);
	const setAuthUser = useAuthStore((state) => state.setAuthUser);
	const navigate = useNavigate();

	const handleLogout = () => {
		setAuthUser(null);
	};

	return (
		<div className="flex items-center gap-4">
			<Dropdown placement="bottom-start">
				<DropdownTrigger className="hover:cursor-pointer">
					<div className="flex items-center flex-row-reverse gap-x-3 border py-2 px-2 rounded-2xl border-gray-300">
						<User
							as="button"
							avatarProps={{
								isBordered: true,
								src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
							}}
							className="transition-transform"
							name=""
							description=""
						/>
						<div className="text-[12px] -space-y-1 text-right flex flex-col">
							<span>{authUser?.fullName}</span>
							<span>Welcome Back!</span>
						</div>
					</div>
				</DropdownTrigger>
				<DropdownMenu
					disabledKeys={["profile"]}
					aria-label="User Actions"
					variant="shadow">
					<DropdownItem
						key="profile"
						className="h-14 gap-2">
						<p className="font-bold">Signed in as</p>
						<p className="font-bold">@{authUser?.username}</p>
					</DropdownItem>
					<DropdownItem
						onClick={() => navigate("blogs/create-post")}
						key="system">
						New Post
					</DropdownItem>
					<DropdownItem
						onClick={() => navigate("/settings")}
						key="settings">
						Settings
					</DropdownItem>
					<DropdownItem
						key="logout"
						onClick={handleLogout}
						color="danger">
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}
