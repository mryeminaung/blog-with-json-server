import { api, formatBlogDate } from "@/lib/utils";
import { BlogInfoType } from "@/types/index";
import { useEffect, useRef, useState } from "react";
import BlogCard from "./components/BlogCard";
import BlogFilter from "./components/BlogFilter";
import BlogSearch from "./components/BlogSearch";

export default function Blogs() {
	const [filterKey, setFilterKey] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [blogs, setBlogs] = useState<BlogInfoType[] | null>([]);
	const [allBlogs, setAllBlogs] = useState<BlogInfoType[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const fetchBlogs = async () => {
		try {
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get("/blogs"),
				api.get("/categories"),
				api.get("/users"),
			]);

			const blogs = blogsRes.data;
			const categories = categoriesRes.data;
			const users = usersRes.data;

			const formattedData: BlogInfoType[] = blogs.map((blog: any) => {
				const categoryObj = categories.find(
					(c: any) => c.id == blog.categoryId,
				);
				const userObj = users.find((u: any) => u.id == blog.userId);

				return {
					id: blog.id,
					title: blog.title,
					content: blog.content,
					slug: blog.slug,
					category: categoryObj
						? { id: categoryObj.id, name: categoryObj.name }
						: "Uncategorized",
					author: userObj
						? { id: userObj.id, fullName: userObj.fullName }
						: "Unknown Author",
					createdAt: formatBlogDate(blog.createdAt),
				};
			});

			setAllBlogs(formattedData);
			filterAndSearchBlogs(formattedData, filterKey, searchQuery);
		} catch (error) {
			console.error("Error formatting blogs:", error);
		}
	};

	const filterAndSearchBlogs = (
		data: BlogInfoType[],
		filter: string,
		search: string,
	) => {
		let filtered =
			filter === "All"
				? data
				: data.filter((blog) => blog.category.name === filter);

		if (search.trim()) {
			filtered = filtered.filter(
				(blog) =>
					blog.title.toLowerCase().includes(search.toLowerCase()) ||
					blog.content.toLowerCase().includes(search.toLowerCase()),
			);
		}

		setBlogs(filtered);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setIsSearching(true);

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		debounceTimer.current = setTimeout(() => {
			filterAndSearchBlogs(allBlogs, filterKey, query);
			setIsSearching(false);
		}, 300);
	};

	useEffect(() => {
		fetchBlogs();
	}, [filterKey]);

	return (
		<div className="pb-10">
			<BlogSearch
				onSearch={handleSearch}
				isLoading={isSearching}
			/>
			<BlogFilter
				filterKey={filterKey}
				setFilterKey={setFilterKey}
			/>
			<div
				className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
					isSearching ? "opacity-70" : "opacity-100"
				}`}>
				{blogs && blogs.length > 0 ? (
					blogs.map((blog) => (
						<BlogCard
							key={blog.id}
							blog={blog}
						/>
					))
				) : (
					<div className="col-span-full text-center py-12">
						<p className="text-gray-500 text-lg">No blogs found</p>
					</div>
				)}
			</div>
		</div>
	);
}
