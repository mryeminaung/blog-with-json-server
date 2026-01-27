import { api } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Button } from "@heroui/button";
import { Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userProfileSchema = z.object({
	id: z.string(),
	fullName: z.string().min(1, "Full name is required"),
	username: z.string().min(1, "Username is required"),
	profile_url: z.string().optional().or(z.literal("")),
	email: z.string().email("Invalid email"),
	phoneNo: z.string().optional().or(z.literal("")),
});

type UserProfile = z.infer<typeof userProfileSchema>;

export default function ProfileEditForm({
	user,
	onCancel,
	setUser,
	setIsEditing,
}: {
	user: UserProfile;
	setUser: (data: UserProfile) => void;
	setIsEditing: (arg0: boolean) => void;
	onCancel: () => void;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserProfile>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: user,
	});
	const authInfo = useAuthStore((state) => state.authUser);

	const onSubmit = async (updatedUser: UserProfile) => {
		try {
			const res = await api.patch(
				`http://localhost:8000/users/${authInfo?.id}`,
				updatedUser,
			);
			setUser(res.data);
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	return (
		<div className="mt-3">
			<form
				className="space-y-4 "
				onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Name"
					{...register("fullName")}
					errorMessage={errors.fullName?.message}
				/>
				<Input
					label="Username"
					{...register("username")}
					errorMessage={errors.username?.message}
				/>
				<Input
					label="Email"
					type="email"
					{...register("email")}
					errorMessage={errors.email?.message}
				/>
				<Input
					label="Phone"
					{...register("phoneNo")}
					errorMessage={errors.phoneNo?.message}
				/>
				<Input
					label="Profile URL"
					{...register("profile_url")}
					errorMessage={errors.profile_url?.message}
				/>
				<div className="flex gap-2">
					<Button
						type="submit"
						color="primary">
						Save
					</Button>
					<Button
						variant="bordered"
						onPress={onCancel}>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}
