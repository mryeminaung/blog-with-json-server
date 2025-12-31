import GuestLayout from "@/layouts/GuestLayout";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

export default function LoginForm() {
	return (
		<GuestLayout>
			<form
				className="max-w-lg w-full mx-auto border border-gray-200 shadow p-8 rounded-2xl bg-white"
				autoComplete="off">
				<div className="text-center mb-6">
					<h1 className="text-3xl font-black text-blue-600">MY BLOG</h1>
					<h3 className="font-semibold text-xl mt-1">
						Welcome back! Login to your account
					</h3>
				</div>

				{/* Email Field */}
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						placeholder="e.g. hello@example.com"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
				</div>

				{/* Password Field */}
				<div className="mb-2">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="••••••••"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
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
