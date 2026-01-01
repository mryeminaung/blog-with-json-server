import { api } from "@/lib/utils";
import { useEffect, useState } from "react";
import RelatedBlogCard from "./components/RelatedBlogCard";

export default function RelatedBlogs({
	currentBlogId,
}: {
	currentBlogId: string;
}) {
	const [relatedBlogs, setRelatedBlogs] = useState<BlogInfoType[] | null>([]);

	const fetchRandomBlogs = async () => {
		try {
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get("/blogs?_limit=20&_sort=created_at&_order=desc"),
				api.get("/categories"),
				api.get("/users"),
			]);

			let rawBlogs = blogsRes.data;
			const allCategories = categoriesRes.data;
			const allUsers = usersRes.data;

			const shuffled = rawBlogs
				.filter((b: any) => b.id !== currentBlogId)
				.sort(() => 0.5 - Math.random());

			const selectedBlogs = shuffled.slice(0, 3).map((blog: any) => {
				const categoryObj = allCategories.find(
					(c: any) => c.id === blog.categoryId,
				);
				const userObj = allUsers.find((u: any) => u.id === blog.userId);

				return {
					id: blog.id,
					title: blog.title,
					content: blog.content,
					slug: blog.slug,
					category: categoryObj || { id: "0", name: "General" },
					author: { id: userObj?.id, fullName: userObj?.fullName || "Guest" },
					createdAt: blog.created_at,
				};
			});

			setRelatedBlogs(selectedBlogs);
		} catch (error) {
			console.error("Error fetching random blogs:", error);
		}
	};

	useEffect(() => {
		fetchRandomBlogs();
	}, [currentBlogId]);

	return (
		<>
			<h2 className="font-bold text-2xl text-left">Related Blogs</h2>
			<div className="space-y-3 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
				{relatedBlogs &&
					relatedBlogs.map((blog) => (
						<RelatedBlogCard
							key={blog.id}
							blog={blog}
						/>
					))}
			</div>
		</>
	);
}
