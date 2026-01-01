import BlogDetailLayout from "@/layouts/BlogDetailLayout";
import { api, formatBlogDate } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@heroui/modal";
import { Button, Image, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Use the interface we defined earlier
interface BlogInfoType {
	id: string;
	title: string;
	content: string;
	slug: string;
	category: { id: string; name: string };
	author: { id: string; fullName: string };
	createdAt: string;
}

export default function BlogDetail() {
	const { slug } = useParams(); // Get slug from URL
	const navigate = useNavigate();
	const authUser = useAuthStore((state) => state.authUser);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [blog, setBlog] = useState<BlogInfoType | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchFullBlogData = async () => {
		try {
			setLoading(true);
			const [blogsRes, categoriesRes, usersRes] = await Promise.all([
				api.get(`/blogs?slug=${slug}`),
				api.get("/categories"),
				api.get("/users"),
			]);

			const rawBlog = blogsRes.data[0];

			if (rawBlog) {
				const categoryObj = categoriesRes.data.find(
					(c: any) => c.id === rawBlog.categoryId,
				);
				const userObj = usersRes.data.find((u: any) => u.id === rawBlog.userId);

				setBlog({
					id: rawBlog.id,
					title: rawBlog.title,
					content: rawBlog.content,
					slug: rawBlog.slug,
					category: categoryObj || { id: "0", name: "Uncategorized" },
					author: { id: userObj?.id, fullName: userObj?.fullName || "Unknown" },
					createdAt: formatBlogDate(rawBlog.createdAt),
				});
			}
		} catch (error) {
			console.error("Error fetching blog:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFullBlogData();
	}, [slug]);

	const handleDelete = async () => {
		if (!blog) return;
		const res = await api.delete(`/blogs/${blog.id}`);
		if (res.status === 200) {
			onClose();
			navigate(`/blogs/featured-blogs`);
		}
	};

	if (loading)
		return (
			<div className="flex justify-center mt-20">
				<Spinner size="lg" />
			</div>
		);

	if (!blog)
		return (
			<div className="text-center mt-20 text-xl font-bold">Post Not Found</div>
		);

	return (
		<BlogDetailLayout currentBlogId={blog.id}>
			<h2 className="text-3xl font-bold">{blog.title}</h2>

			<div className="mt-5 space-y-6 relative">
				<Image
					src="/src/assets/blog-img.jpg"
					alt="blog img"
					width={"100%"}
					className="rounded-xl max-h-100"
				/>
				<span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 text-white text-[10px] tracking-widest z-10 uppercase font-bold">
					{blog.category.name}
				</span>
			</div>

			<div className="flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between border-b pb-6">
				<div className="flex items-center gap-x-3">
					<img
						src="/src/assets/robot.png"
						alt="author"
						className="w-12 h-12 border-2 border-blue-500 rounded-full p-0.5"
					/>
					<div className="flex flex-col">
						<span className="font-bold text-gray-900">
							{blog.author.fullName}
						</span>
						<span className="text-sm text-gray-500">{blog.createdAt}</span>
					</div>
				</div>

				{authUser?.id === blog.author.id && (
					<div className="flex gap-2">
						<Button
							size="sm"
							color="warning"
							variant="flat"
							className="font-semibold"
							onPress={() => navigate(`/blogs/${blog.id}/edit-post`)}
							startContent={<PencilSquareIcon className="size-4" />}>
							Edit
						</Button>
						<Button
							size="sm"
							color="danger"
							variant="flat"
							className="font-semibold"
							onPress={onOpen}
							startContent={<TrashIcon className="size-4" />}>
							Delete
						</Button>
					</div>
				)}
			</div>

			<div className="prose prose-blue max-w-none">
				<p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
					{blog.content}
				</p>
			</div>

			<Modal
				backdrop="blur"
				isOpen={isOpen}
				onClose={onClose}>
				<ModalContent>
					<ModalHeader>Confirm Deletion</ModalHeader>
					<ModalBody>
						<p className="text-gray-600">
							Are you sure? This action cannot be undone.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="light"
							onPress={onClose}>
							Cancel
						</Button>
						<Button
							color="danger"
							onPress={handleDelete}>
							Delete Permanently
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</BlogDetailLayout>
	);
}
