import {
	ClipboardDocumentListIcon,
	LockClosedIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Select, SelectItem, Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import ProfileTab from "./components/ProfileTab";
import SecurityTab from "./components/SecurityTab";
import UserPosts from "./components/UserPosts";

export default function UserSetting() {
	const [selectedTab, setSelectedTab] = useState("profile");

	const tabs = [
		{
			key: "profile",
			label: "Profile",
			icon: UserCircleIcon,
			component: ProfileTab,
		},
		{
			key: "security",
			label: "Security",
			icon: LockClosedIcon,
			component: SecurityTab,
		},
		{
			key: "posts",
			label: "All Posts",
			icon: ClipboardDocumentListIcon,
			component: UserPosts,
		},
	];

	const TabComponent =
		tabs.find((t) => t.key === selectedTab)?.component || ProfileTab;

	return (
		<div className="flex flex-col py-4">
			<div className="flex w-full flex-col">
				{/* Desktop Tabs */}
				<div className="hidden md:block">
					<Tabs
						aria-label="Options"
						selectedKey={selectedTab}
						onSelectionChange={(key) => setSelectedTab(key as string)}>
						{tabs.map((tab) => (
							<Tab
								key={tab.key}
								title={
									<div className="flex items-center space-x-2">
										<tab.icon className="size-5" />
										<span>{tab.label}</span>
									</div>
								}
							/>
						))}
					</Tabs>
				</div>

				{/* Mobile Dropdown */}
				<div className="md:hidden mb-4">
					<Select
						label="Select Tab"
						selectedKeys={[selectedTab]}
						onChange={(e) => setSelectedTab(e.target.value)}>
						{tabs.map((tab) => (
							<SelectItem key={tab.key}>{tab.label}</SelectItem>
						))}
					</Select>
				</div>

				{/* Tab Content */}
				<TabComponent />
			</div>
		</div>
	);
}
