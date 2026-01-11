import { Button, Card, CardBody } from "@heroui/react";

export default function SecurityTab() {
	return (
		<Card className="mt-3">
			<CardBody>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						Old Password
					</label>
					<input
						type="password"
						name="password"
						placeholder="********"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="newPwd"
						className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
						New Password
					</label>
					<input
						type="password"
						name="newPwd"
						placeholder="********"
						className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
				</div>
				<Button
					type="submit"
					color="primary"
					className="ml-auto flex items-center justify-center gap-2 rounded-xl text-medium font-semibold">
					<span>Change Password</span>
				</Button>
			</CardBody>
		</Card>
	);
}
