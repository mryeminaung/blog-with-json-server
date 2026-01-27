import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function BlogSearch({
	onSearch,
	isLoading = false,
}: {
	onSearch: (query: string) => void;
	isLoading?: boolean;
}) {
	const [query, setQuery] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		onSearch(value);
	};

	const handleClear = () => {
		setQuery("");
		onSearch("");
	};

	return (
		<div className="py-5">
			<h2 className="text-3xl font-bold">All Blogs</h2>
			<p className="text-gray-500">
				Discover stories and insights from our community
			</p>
			<form
				className="mt-5"
				autoComplete="off"
				onSubmit={(e) => e.preventDefault()}>
				<div className="relative items-center flex">
					<MagnifyingGlassIcon
						className={`absolute size-8 ml-3 transition-all duration-300 ${
							isLoading ? "text-blue-500 animate-pulse" : "text-gray-400"
						}`}
					/>
					<input
						type="text"
						name="query"
						value={query}
						onChange={handleInputChange}
						placeholder="Search by title or content..."
						className="w-full px-3 pl-14 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
					/>
					{query && (
						<button
							type="button"
							onClick={handleClear}
							className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
							aria-label="Clear search">
							✕
						</button>
					)}
				</div>
			</form>
		</div>
	);
}
