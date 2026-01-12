import { api, formatBlogDate } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { BlogInfoType } from "@/types";
import { Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import BlogCard from "../../blogs/components/BlogCard";

export default function UserPosts() {
	const authUser = useAuthStore((state) => state.authUser);
	const [userBlogs, setUserBlogs] = useState<BlogInfoType[] | null>([]);

	const fetchUserBlogs = async () => {
		if (!authUser?.id) return;
		try {
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get(`/blogs?userId=${authUser.id}`),
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
			setUserBlogs(formattedData);
		} catch (error) {
			console.error("Error fetching user blogs:", error);
		}
	};

	useEffect(() => {
		fetchUserBlogs();
	}, [authUser]);

	return (
		<Card className="mt-3">
			<CardBody>
				<h3 className="text-xl font-semibold mb-5">
					{authUser?.fullName}'s Posts
				</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{userBlogs && userBlogs.length > 0 ? (
						userBlogs.map((blog) => (
							<BlogCard
								key={blog.id}
								blog={blog}
							/>
						))
					) : (
						<p className="col-span-full text-center text-gray-500">
							No posts found.
						</p>
					)}
				</div>
			</CardBody>
		</Card>
	);
}
