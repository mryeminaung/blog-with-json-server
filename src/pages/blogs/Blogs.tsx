import { api, formatBlogDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import BlogCard from "./components/BlogCard";
import BlogFilter from "./components/BlogFilter";
import BlogSearch from "./components/BlogSearch";

export default function Blogs() {
	const [filterKey, setFilterKey] = useState("All");
	const [blogs, setBlogs] = useState<BlogInfoType[] | null>([]);

	const fetchBlogs = async () => {
		try {
			// 1. Fetch all three resources in parallel for better performance
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get("/blogs"),
				api.get("/categories"),
				api.get("/users"),
			]);

			const blogs = blogsRes.data;
			const categories = categoriesRes.data;
			const users = usersRes.data;

			// 2. Map and format the data to match BlogInfoType
			const formattedData: BlogInfoType[] = blogs.map((blog: any) => {
				// Find the name for the category ID
				const categoryObj = categories.find(
					(c: any) => c.id === blog.categoryId,
				);
				// Find the name for the user ID
				const userObj = users.find((u: any) => u.id === blog.userId);

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

			if (formattedData) {
				let filteredBlogs =
					filterKey === "All"
						? formattedData
						: formattedData.filter((blog) => blog.category.name === filterKey);

				setBlogs(filteredBlogs);
			}
		} catch (error) {
			console.error("Error formatting blogs:", error);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, [filterKey]);

	return (
		<div className="pb-10">
			<BlogSearch />
			<BlogFilter
				filterKey={filterKey}
				setFilterKey={setFilterKey}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{blogs && blogs.map((blog) => <BlogCard blog={blog} />)}
			</div>
		</div>
	);
}
