import { Card } from "@heroui/card";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }: { blog: BlogInfoType }) {
	return (
		<Card
			key={blog.id}
			className="overflow-hidden bg-white border border-gray-200 shadow relative p-1 hover:border-1.5 hover:shadow-md transition-all duration-200">
			<Image
				src="/src/assets/blog-img.jpg"
				alt=""
				// isZoomed={true}
				// isBlurred={true}
				radius="sm"
				className="object-contain h-52w-full"
			/>
			<span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 text-white text-[10px] tracking-widest z-10 uppercase font-bold">
				{blog.category.name}
			</span>

			<div className="p-3">
				<h2 className="font-bold text-md line-clamp-1">{blog.title}</h2>
				<p className="text-[13px] my-2 line-clamp-2">{blog.content}</p>

				<div className="flex flex-row justify-between items-center gap-x-2 mt-3">
					<div className="flex flex-row items-center gap-x-2">
						<img
							src={"/src/assets/robot.png"}
							alt=""
							className="object-fit w-8 h-8 border  border-blue-500 rounded-full"
						/>
						<div className="flex flex-col justify-start  text-[14px] -space-y-1">
							<span className="font-semibold capitalize">
								{blog.author.fullName}
							</span>
							<span className="">{blog.createdAt}</span>
						</div>
					</div>

					<Link
						to={`/blogs/${blog.slug}`}
						state={{ blog, author: blog.author }}
						className="inline-block px-4 py-2 text-[11px] font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
						Read more
					</Link>
				</div>
			</div>
		</Card>
	);
}
