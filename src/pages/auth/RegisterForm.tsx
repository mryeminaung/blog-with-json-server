import ErrorLabel from "@/components/ErrorLabel";
import GuestLayout from "@/layouts/GuestLayout";
import { api, IsLogin } from "@/lib/utils";
import { ArrowPathIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as z from "zod";

const RegisterSchema = z
	.object({
		fullName: z.string().min(1, "Full name is required"),
		email: z.string().email("Invalid email format"),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirm_pwd: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirm_pwd, {
		message: "Passwords don't match",
		path: ["confirm_pwd"],
	});
type RegisterInput = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterInput>({
		resolver: zodResolver(RegisterSchema),
	});

	const navigate = useNavigate();

	const onSubmit = async (data: RegisterInput) => {
		try {
			const salt = bcrypt.genSaltSync(10);
			const hashPwd = bcrypt.hashSync(data.password, salt);
			const res = await api.post("/users", {
				fullName: data.fullName,
				email: data.email,
				password: hashPwd,
			});
			if (!res.data) {
				throw new Error("Error occour");
			} else {
				console.log("Register Success");
				navigate("/login", {
					state: { ...data, id: res.data.id },
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (IsLogin()) return <Navigate to="blogs/featured-blogs" />;

	return (
		<GuestLayout>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-lg w-full mx-auto border border-gray-200 shadow p-8 rounded-2xl bg-white"
				autoComplete="off">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-black text-blue-600">MY BLOG</h1>
					<h2 className="font-semibold text-xl">Create a new account</h2>
					<p className="text-gray-500 text-md mt-1">
						Join our community and start sharing your stories today.
					</p>
				</div>

				<div className="mb-5">
					<label
						htmlFor="fullName"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Full Name
					</label>
					<input
						{...register("fullName")}
						type="text"
						name="fullName"
						placeholder="John Doe"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
					{errors.fullName && <ErrorLabel message={errors.fullName.message} />}
				</div>

				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Email Address
					</label>
					<input
						{...register("email")}
						type="email"
						name="email"
						placeholder="name@company.com"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
					{errors.email && <ErrorLabel message={errors.email.message} />}
				</div>

				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Password
					</label>
					<input
						{...register("password")}
						type="password"
						name="password"
						placeholder="••••••••"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
					{errors.password && <ErrorLabel message={errors.password.message} />}
				</div>

				<div className="mb-6">
					<label
						htmlFor="confirm_pwd"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Confirm Password
					</label>
					<input
						{...register("confirm_pwd")}
						type="password"
						name="confirm_pwd"
						placeholder="••••••••"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
					{errors.confirm_pwd && (
						<ErrorLabel message={errors.confirm_pwd.message} />
					)}
				</div>

				<Button
					type="submit"
					color="primary"
					className="w-full flex items-center justify-center gap-2 rounded-xl text-medium font-semibold shadow-md">
					{isSubmitting ? (
						<>
							<ArrowPathIcon className="size-5" />
							<span>Registering...</span>
						</>
					) : (
						<>
							<UserPlusIcon className="size-5" />
							<span>Create Account</span>
						</>
					)}
				</Button>

				<p className="text-center text-sm text-gray-500 mt-3 space-x-1">
					<span>Already have an account?</span>
					<Link
						to="/login"
						type="button"
						className="font-bold text-blue-600 hover:underline">
						Sign In
					</Link>
				</p>
			</form>
		</GuestLayout>
	);
}
