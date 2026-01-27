import { api } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import ProfileView from "./ProfileView";

interface UserProfile {
	id: string;
	fullName: string;
	username: string;
	profile_url: string;
	email: string;
	phoneNo: string;
	registerAt?: string;
}

export default function ProfileTab() {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const authInfo = useAuthStore((state) => state.authUser);

	const fetchUser = async () => {
		try {
			const res = await api.get(`http://localhost:8000/users/${authInfo?.id}`);
			setUser(res.data);
		} catch (error) {
			console.error("Error fetching user:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	if (loading) return <Spinner />;
	if (!user) return <p>User not found</p>;

	return isEditing ? (
		<ProfileEditForm
			user={user}
			setIsEditing={setIsEditing}
			onCancel={() => setIsEditing(false)}
			setUser={setUser}
		/>
	) : (
		<ProfileView
			user={user}
			onEdit={() => setIsEditing(true)}
		/>
	);
}
