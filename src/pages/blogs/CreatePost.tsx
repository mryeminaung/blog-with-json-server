import ErrorLabel from "@/components/ErrorLabel";
import AuthLayout from "@/layouts/AuthLayout";
import { api } from "@/lib/utils";
import useAuthStore from "@/stores/useAuthStore";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreatePostSchema = z.object({
	title: z.string(),
	content: z.string().min(10, ""),
	slug: z.string(),
	categoryId: z.string(),
	createdAt: z.string().optional(),
	userId: z.string(),
});

type CreatePostInput = z.infer<typeof CreatePostSchema>;

type CategoryType = {
	id: number;
	name: string;
};

export default function CreatePost() {
	const [categories, setCategories] = useState<CategoryType[] | null>([]);
	const authUser = useAuthStore((state) => state.authUser);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreatePostInput>({
		resolver: zodResolver(CreatePostSchema),
		defaultValues: {
			title: "",
			slug: "",
			content: "",
			categoryId: "6",
			createdAt: "",
			userId: authUser?.id,
		},
	});

	const fetchCategories = async () => {
		const res = await api.get("categories");
		setCategories(res.data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const onSubmit = async (data: CreatePostInput) => {
		try {
			const postSlug = data.title.toLowerCase().replaceAll(" ", "-");
			const res = await api.post("/blogs", {
				...data,
				slug: postSlug,
				createdAt: new Date().toISOString(),
			});
			if (res.data) {
				reset();
			} else {
				console.error("Error");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthLayout>
			<Card className="rounded-xl mt-5 border-[0.5px] border-gray-200 shadow px-5">
				<CardHeader className="flex gap-3">
					<div className="flex flex-col ">
						<p className="text-lg font-semibold">Create a Post</p>
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
								onClick={reset}
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
		</AuthLayout>
	);
}
