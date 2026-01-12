import ErrorLabel from "@/components/ErrorLabel";
import { api } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Button, Card, CardBody } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ChangePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, { message: "Old password is required" }),
		newPassword: z
			.string()
			.min(8, { message: "New password must be at least 8 characters long" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm password is required" }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "New password and confirm password do not match",
		path: ["confirmPassword"],
	});

type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export default function SecurityTab() {
	const authUser = useAuthStore((state) => state.authUser);
	const setAuthUser = useAuthStore((state) => state.setAuthUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm<ChangePasswordInput>({
		resolver: zodResolver(ChangePasswordSchema),
	});

	const checkOldPwd = async (formOldPwd: string) => {
		const res = await api.get(`/users/${authUser?.id}`);
		const storedHashedPassword = res.data.password;
		return bcrypt.compare(formOldPwd, storedHashedPassword);
	};

	const onSubmit = async (data: ChangePasswordInput) => {
		let isValidPwd = await checkOldPwd(data.oldPassword);
		if (isValidPwd) {
			const hashedNewPwd = await bcrypt.hash(data.newPassword, 10);
			const res = await api.patch(`/users/${authUser?.id}`, {
				password: hashedNewPwd,
			});
			if (res.status === 200) {
				reset();
				setAuthUser(null);
			}
		} else {
			setError("oldPassword", {
				type: "manual",
				message: "Old password does not match",
			});
		}
	};

	return (
		<Card className="mt-3">
			<CardBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-5">
						<label
							htmlFor="oldPassword"
							className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
							Old Password
						</label>
						<input
							{...register("oldPassword")}
							type="password"
							name="oldPassword"
							placeholder="********"
							className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
						/>
						{errors.oldPassword && (
							<ErrorLabel message={errors.oldPassword.message} />
						)}
					</div>
					<div className="mb-5">
						<label
							htmlFor="newPassword"
							className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
							New Password
						</label>
						<input
							{...register("newPassword")}
							type="password"
							name="newPassword"
							placeholder="********"
							className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
						/>
						{errors.newPassword && (
							<ErrorLabel message={errors.newPassword.message} />
						)}
					</div>
					<div className="mb-5">
						<label
							htmlFor="confirmPassword"
							className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
							Confirm Password
						</label>
						<input
							{...register("confirmPassword")}
							type="password"
							name="confirmPassword"
							placeholder="********"
							className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
						/>
						{errors.confirmPassword && (
							<ErrorLabel message={errors.confirmPassword.message} />
						)}
					</div>
					<Button
						type="submit"
						color="primary"
						className="ml-auto flex items-center justify-center gap-2 rounded-xl text-medium font-semibold">
						<span>Change Password</span>
					</Button>
				</form>
			</CardBody>
		</Card>
	);
}
