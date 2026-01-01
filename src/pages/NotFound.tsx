import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-6">
			<div className="text-center">
				<h1 className="text-9xl font-black text-blue-600 opacity-20">404</h1>

				<div className="relative">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Oops! Page Not Found
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
						The page you are looking for might have been removed, had its name
						changed, or is temporarily unavailable.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button
							variant="bordered"
							onPress={() => navigate(-1)}
							className="rounded-xl font-semibold border-gray-300"
							startContent={<ArrowLeftIcon className="size-5" />}>
							Go Back
						</Button>

						<Button
							color="primary"
							onPress={() => navigate("/")}
							className="rounded-xl font-semibold shadow-lg shadow-blue-200"
							startContent={<HomeIcon className="size-5" />}>
							Back to Home
						</Button>
					</div>
				</div>
			</div>

			<div className="mt-16 text-gray-400 text-sm">
				&copy; {new Date().getFullYear()} Your Blog PJ. All rights reserved.
			</div>
		</div>
	);
}
