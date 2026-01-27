import { Button } from "@heroui/button";

interface UserProfile {
	id: string;
	fullName: string;
	username: string;
	profile_url: string;
	email: string;
	phoneNo: string;
	registerAt: string;
}

export default function ProfileView({
	user,
	onEdit,
}: {
	user: UserProfile;
	onEdit: () => void;
}) {
	return (
		<div className="space-y-3 mt-3">
			<img
				src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
				alt="Profile"
				className="w-24 h-24 rounded-full"
			/>
			<p>
				<strong>Name:</strong> {user.fullName}
			</p>
			<p>
				<strong>Email:</strong> {user.email}
			</p>
			<p>
				<strong>Phone:</strong> {user.phoneNo ?? "NA"}
			</p>
			<p>
				<strong>Registered:</strong>{" "}
				{new Date(user.registerAt).toLocaleDateString()}
			</p>
			<Button
				color="primary"
				onClick={onEdit}>
				Edit Profile
			</Button>
		</div>
	);
}
