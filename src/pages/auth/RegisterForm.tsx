import GuestLayout from "@/layouts/GuestLayout";
import { UserPlusIcon } from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export default function RegisterForm() {
	return (
		<GuestLayout>
			<form
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
						htmlFor="name"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Full Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="John Doe"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="name@company.com"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="••••••••"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="confirm-password"
						className="block mb-2 text-sm font-semibold text-gray-700">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirm-password"
						name="confirm-password"
						placeholder="••••••••"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
					/>
				</div>

				<Button
					type="submit"
					color="primary"
					className="w-full flex items-center justify-center gap-2 rounded-xl text-medium font-semibold shadow-md">
					<UserPlusIcon className="size-5" />
					<span>Create Account</span>
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
