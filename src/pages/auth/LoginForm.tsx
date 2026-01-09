import ErrorLabel from "@/components/ErrorLabel";
import GuestLayout from "@/layouts/GuestLayout";
import { api, IsLogin } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import {
	ArrowRightEndOnRectangleIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";

const LoginSchema = z.object({
	id: z.string(),
	email: z.string().email("Invalid email format"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginInput = z.infer<typeof LoginSchema>;

type UserInfo = {
	id: string;
	fullName: string;
	email: string;
	username: string;
	password: string;
};

export default function LoginForm() {
	const setAuthUser = useAuthStore((state) => state.setAuthUser);
	const [registeredUsers, setRegisteredUsers] = useState<UserInfo[]>([]);
	const navigate = useNavigate();
	const [showPwd, setShowPwd] = useState<boolean>(false);
	const location = useLocation();
	const hasRegistered = location.state !== null;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			id: hasRegistered ? location.state.id : "",
			email: hasRegistered ? location.state.email : "",
			password: "",
		},
	});

	const fetchRegisteredUsers = async () => {
		const res = await api.get("/users");
		setRegisteredUsers(res.data);
	};

	useEffect(() => {
		fetchRegisteredUsers();
	}, []);

	const onSubmit = async (data: LoginInput) => {
		const authUser = registeredUsers.find((user) => user.email === data.email);
		if (authUser) {
			const isPwdMatch = bcrypt.compareSync(data.password, authUser.password);
			if (isPwdMatch) {
				console.log("Login Success");
				const { id, fullName, email, username } = authUser;
				setAuthUser({
					id,
					fullName,
					username,
					email,
				});
				navigate("/featured-blogs");
			} else {
				console.error("Invalid Credentials");
			}
		} else {
			console.error("Not Registered");
		}
	};

	if (IsLogin()) return <Navigate to="/featured-blogs" />;

	return (
		<GuestLayout>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-lg w-full mx-auto border border-gray-200 shadow p-8 rounded-2xl bg-white"
				autoComplete="off">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-black text-blue-600">MY BLOG</h1>
					<h3 className="font-semibold text-xl mt-1">
						Welcome back! Login to your account
					</h3>
				</div>

				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						Email Address
					</label>
					<input
						{...register("email")}
						type="email"
						name="email"
						placeholder="e.g. hello@example.com"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
					{errors.email && <ErrorLabel message={errors.email.message} />}
				</div>

				<div className="mb-2">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						Password
					</label>
					<div className="relative">
						<input
							{...register("password")}
							type={showPwd ? "text" : "password"}
							name="password"
							placeholder="••••••••"
							className="w-full px-3 py-2 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
						/>
						{showPwd ? (
							<EyeIcon
								onClick={() => setShowPwd(false)}
								className="hover:cursor-pointer size-4 absolute right-5 bottom-3"
							/>
						) : (
							<EyeSlashIcon
								onClick={() => setShowPwd(true)}
								className="hover:cursor-pointer size-4 absolute right-5 bottom-3"
							/>
						)}
					</div>
					{errors.password && <ErrorLabel message={errors.password.message} />}
				</div>

				<div className="flex items-center justify-between mb-6 mt-3">
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="remember"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
						/>
						<label
							htmlFor="remember"
							className="text-sm font-medium text-gray-600 cursor-pointer select-none">
							Remember me
						</label>
					</div>

					<button
						type="button"
						className="text-sm text-blue-600 hover:underline">
						Forgot Password?
					</button>
				</div>

				<Button
					type="submit"
					color="primary"
					className="w-full flex items-center justify-center gap-2 rounded-xl text-medium font-semibold">
					<ArrowRightEndOnRectangleIcon className="size-5" />
					<span>Log In</span>
				</Button>

				<p className="text-center text-sm text-gray-600 mt-2 space-x-1">
					<span>Don't have an account?</span>
					<Link
						to="/register"
						className="font-bold text-blue-600 hover:underline">
						Sign up for free
					</Link>
				</p>
			</form>
		</GuestLayout>
	);
}
