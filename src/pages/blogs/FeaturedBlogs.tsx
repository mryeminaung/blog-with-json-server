import AuthLayout from "@/layouts/AuthLayout";
import { api, formatBlogDate } from "@/lib/utils";
import { Card } from "@heroui/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./components/BlogCard";

export default function FeaturedBlogs() {
	const [latestBlogs, setLatestBlogs] = useState<BlogInfoType[] | null>([]);

	const fetchLatestBlogs = async () => {
		try {
			// 1. Fetch all three resources in parallel for better performance
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get("/blogs?_sort=createdAt&_order=asc&_limit=20"),
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
					category: categoryObj ? categoryObj.name : "Uncategorized",
					author: userObj ? userObj.fullName : "Unknown Author",
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
		<AuthLayout>
			<div className="my-5 space-y-3">
				<h2 className="text-2xl font-bold">Latest Posts</h2>
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
						<p className="text-gray-500">
							No posts yet. Be the first to share!
						</p>
						<Link
							to={"/blogs/create-post"}
							className="px-7 font-semibold bg-blue-700 rounded-lg text-white py-2">
							Create the first post
						</Link>
					</Card>
				)}
			</div>
		</AuthLayout>
	);
}
