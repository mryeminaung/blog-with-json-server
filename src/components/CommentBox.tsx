import { api } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { CommentInfo } from "@/types";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CommentItem from "./CommentItem";
import ErrorLabel from "./ErrorLabel";

const CommentSchema = z.object({
	content: z
		.string()
		.min(5, { message: "Content is too short (minimum 10 characters)" }),
	blogId: z.string(),
	userId: z.string(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
});

type CommentInput = z.infer<typeof CommentSchema>;

export default function CommentBox({ blogId }: { blogId: string }) {
	const authUser = useAuthStore((state) => state.authUser);
	const [comments, setComments] = useState<CommentInfo[]>([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CommentInput>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			content: "",
			createdAt: "",
			updatedAt: "",
			blogId: blogId,
			userId: authUser?.id,
		},
	});

	const fetchBlogComments = async () => {
		try {
			const [commentsRes, usersRes] = await Promise.all([
				api.get(`http://localhost:8000/comments?blogId=${blogId}`),
				api.get(`http://localhost:8000/users`),
			]);

			const comments = commentsRes.data;
			const users = usersRes.data;

			const formattedComments = comments.map((comment: any) => {
				const userData = users.find((u: any) => u.id === comment.userId);

				return {
					id: comment.id,
					content: comment.content,
					updatedAt: comment.updatedAt,
					author: {
						id: userData?.id || "unknown",
						name: userData?.fullName || "Anonymous",
					},
				};
			});
			setComments(formattedComments);
		} catch (error) {
			console.error("Fetch error:", error);
			return [];
		}
	};

	useEffect(() => {
		fetchBlogComments();
	}, [blogId]);

	const onSubmit = async (data: CommentInput) => {
		try {
			const res = await api.post("/comments", {
				...data,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
			if (res.data) {
				reset();
				fetchBlogComments();
			} else {
				console.error("Error");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="my-5 border-b pb-6 border-gray-300">
			<h3 className="text-xl font-semibold mb-3 space-x-3">
				<span>Comments</span>
				{comments.length > 0 && (
					<span className="bg-gray-500 px-2 rounded-full text-sm py-1 text-white">
						{comments.length}
					</span>
				)}
			</h3>

			<div className="space-y-3">
				{comments.length === 0 ? (
					<p className="p-10 mb-3 text-center border text-sm rounded-xl border-gray-100 hover:border-gray-300">
						Be the first to share your thoughts!
					</p>
				) : (
					comments.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
						/>
					))
				)}
			</div>

			<div className="">
				<h3 className="text-xl font-semibold mb-3">Leave a comment</h3>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-end gap-y-3">
					<textarea
						{...register("content")}
						rows={4}
						placeholder="Share your thoughts..."
						className="resize-none w-full px-3 py-1.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
					/>
					{errors.content && <ErrorLabel message={errors.content.message} />}

					<Button
						type="submit"
						color="primary"
						className="px-3 rounded-xl font-semibold shadow-lg shadow-blue-200">
						<PaperAirplaneIcon className="size-5" />
						Post
					</Button>
				</form>
			</div>
		</div>
	);
}
