import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function BlogSearch() {
	return (
		<div className="py-5">
			<h2 className="text-3xl font-bold">All Blogs</h2>
			<p className="text-gray-500">
				Discover stories and insights from our community
			</p>
			<form
				className="mt-5"
				autoComplete="off">
				<div className="relative items-center flex">
					<MagnifyingGlassIcon className="absolute text-gray-400 size-8 ml-3" />
					<input
						type="text"
						name="query"
						placeholder="Search by title, content, or author..."
						className="w-full px-3 pl-14 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
				</div>
			</form>
		</div>
	);
}
