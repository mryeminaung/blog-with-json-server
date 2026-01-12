import { api, formatBlogDate } from "@/lib/utils";
import { BlogInfoType } from "@/types";
import { Card } from "@heroui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./components/BlogCard";

export default function FeaturedBlogs() {
	const [latestBlogs, setLatestBlogs] = useState<BlogInfoType[] | null>([]);

	const fetchLatestBlogs = async () => {
		try {
			// Fetch all three resources in parallel for better performance
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get("/blogs?_sort=createdAt&_order=asc&_limit=9"),
				api.get("/categories"),
				api.get("/users"),
			]);

			const blogs = blogsRes.data;
			const categories = categoriesRes.data;
			const users = usersRes.data;
			// Map and format the data to match BlogInfoType
			const formattedData: BlogInfoType[] = blogs.map((blog: any) => {
				// Find the name for the category ID
				const categoryObj = categories.find(
					(c: any) => c.id == blog.categoryId,
				);
				// Find the name for the user ID
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
			setLatestBlogs(formattedData);
		} catch (error) {
			console.error("Error formatting blogs:", error);
		}
	};

	useEffect(() => {
		fetchLatestBlogs();
	}, []);

	return (
		<div className="my-5 space-y-3">
			<div className="flex items-center justify-between border-b-2 border-b-gray-300 mb-5">
				<h2 className="text-2xl font-bold">Latest Posts</h2>
				<Link
					to={"/blogs"}
					className="text-lg font-semibold hover:underline hover:text-blue-500 hover:cursor-pointer">
					See all
				</Link>
			</div>
			{latestBlogs ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{latestBlogs.map((blog) => (
						<BlogCard
							key={blog.id}
							blog={blog}
						/>
					))}
				</div>
			) : (
				<Card className="rounded-xl  border-[0.5px] border-gray-200 shadow flex items-center justify-center py-10 space-y-4">
					<p className="text-gray-500">No posts yet. Be the first to share!</p>
					<Link
						to={"/blogs/create-post"}
						className="px-7 font-semibold bg-blue-700 rounded-lg text-white py-2">
						Create the first post
					</Link>
				</Card>
			)}
		</div>
	);
}
