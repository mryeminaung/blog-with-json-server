import ErrorLabel from "@/components/ErrorLabel";
import { api } from "@/lib/utils";
import {
	ArrowLeftIcon,
	MinusCircleIcon,
	PlusCircleIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";

const EditPostSchema = z.object({
	title: z.string(),
	content: z.string().min(10, ""),
	slug: z.string(),
	categoryId: z.string(),
});

type EditPostInput = z.infer<typeof EditPostSchema>;

type CategoryType = {
	id: number;
	name: string;
};

export default function EditPost() {
	const [categories, setCategories] = useState<CategoryType[] | null>([]);
	const navigate = useNavigate();
	const { blogId } = useParams();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EditPostInput>({
		resolver: zodResolver(EditPostSchema),
		defaultValues: {
			title: "",
			slug: "",
			content: "",
			categoryId: "6",
		},
	});

	const onSubmit = async (data: EditPostInput) => {
		try {
			const postSlug = data.title.toLowerCase().replaceAll(" ", "-");
			const res = await api.patch(`/blogs/${blogId}`, {
				...data,
				categoryId: parseInt(data.categoryId),
				slug: postSlug,
			});
			if (res.status === 200) {
				navigate(`/blogs/${res.data.slug}`);
			} else {
				console.error("Error");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchBlog = async () => {
		try {
			const res = await api.get(`/blogs/${blogId}`);
			if (res.data) {
				reset(res.data);
			} else {
				console.error("Error");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCategories = async () => {
		const res = await api.get("categories");
		setCategories(res.data);
	};

	useEffect(() => {
		fetchCategories();
		fetchBlog();
	}, []);

	return (
		<div className="space-y-5">
			<Button
				onPress={() => navigate("/blogs")}
				variant="ghost"
				color="primary"
				className="mt-5">
				<ArrowLeftIcon className="size-4" />
				Back to Blogs
			</Button>
			<Card className="rounded-xl border-[0.5px] border-gray-200 shadow px-5">
				<CardHeader className="flex gap-3">
					<div className="flex flex-col ">
						<p className="text-lg font-semibold">Edit a Post</p>
						<p className="text-small text-default-500">
							Share your thoughts with our community
						</p>
					</div>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-5">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
								Title <span className="text-red-500">*</span>
							</label>
							<input
								{...register("title")}
								type="text"
								name="title"
								placeholder="Enter post title"
								className="w-full px-3 py-1.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
							/>
							{errors.title && <ErrorLabel message={errors.title.message} />}
						</div>
						<div className="mb-5">
							<label
								htmlFor="categoryId"
								className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
								Category
							</label>
							<Select
								className="w-full"
								{...register("categoryId")}
								aria-label="categoryId"
								labelPlacement={"outside"}
								placeholder="Select a category">
								{categories &&
									categories?.map((category) => (
										<SelectItem key={category.id.toString()}>
											{category.name}
										</SelectItem>
									))}
							</Select>
							{errors.categoryId && (
								<ErrorLabel message={errors.categoryId.message} />
							)}
						</div>
						<div className="mb-5">
							<label
								htmlFor="content"
								className="block mb-2 text-sm font-semibold text-gray-700 dark:text-white">
								Content <span className="text-red-500">*</span>
							</label>
							<textarea
								{...register("content")}
								name="content"
								rows={8}
								placeholder="Write your post content here..."
								className="resize-none w-full px-3 py-1.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
							/>
							{errors.content && (
								<ErrorLabel message={errors.content.message} />
							)}
						</div>
						<div className="flex items-center gap-x-5">
							<Button
								type="reset"
								onPress={() => navigate(-1)}
								color="primary"
								variant="ghost"
								className="w-full flex items-center justify-center gap-2 rounded-xl text-medium font-semibold">
								<MinusCircleIcon className="size-5" />
								<span>Cancel</span>
							</Button>
							<Button
								type="submit"
								color="primary"
								className="w-full flex items-center justify-center gap-2 rounded-xl text-medium font-semibold">
								<PlusCircleIcon className="size-5" />
								<span>Publish</span>
							</Button>
						</div>
					</form>
				</CardBody>
			</Card>
		</div>
	);
}
