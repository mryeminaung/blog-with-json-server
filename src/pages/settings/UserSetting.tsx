import {
	ClipboardDocumentListIcon,
	LockClosedIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Tab, Tabs } from "@heroui/react";
import ProfileTab from "./components/ProfileTab";
import SecurityTab from "./components/SecurityTab";
import UserPosts from "./components/UserPosts";

export default function UserSetting() {
	return (
		<div className="flex flex-col p-4">
			<div className="flex w-full flex-col">
				<Tabs
					aria-label="Options"
					isVertical={false}>
					<Tab
						key="profile"
						title={
							<div className="flex items-center space-x-2">
								<UserCircleIcon className="size-5" />
								<span>Profile</span>
							</div>
						}>
						<ProfileTab />
					</Tab>
					<Tab
						key="security"
						title={
							<div className="flex items-center space-x-2">
								<LockClosedIcon className="size-5" />
								<span>Security</span>
							</div>
						}>
						<SecurityTab />
					</Tab>
					<Tab
						key="posts"
						title={
							<div className="flex items-center space-x-2">
								<ClipboardDocumentListIcon className="size-5" />
								<span>All Posts</span>
							</div>
						}>
						<UserPosts />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
