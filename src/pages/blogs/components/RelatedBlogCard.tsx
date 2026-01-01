import { scrollToTop } from "@/lib/utils";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";

export default function RelatedBlogCard({ blog }: { blog: BlogInfoType }) {
	return (
		<Link
			key={blog.id}
			to={`/blogs/${blog.slug}`}
			onClick={scrollToTop}
			className="flex flex-col relative">
			<Image
				className="object-contain w-full"
				src="/src/assets/blog-img.jpg"
				alt="blgo image"
			/>
			<span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 text-white text-[10px] tracking-widest z-10 uppercase font-bold">
				{blog.category.name}
			</span>

			<div className="flex text-left mt-3 flex-col justify-between leading-normal">
				<h5 className=" text-md font-bold tracking-tight text-gray-900 line-clamp-1">
					{blog.title}
				</h5>
				<p className="mb-3 font-normal text-sm text-gray-700 line-clamp-2">
					{blog.content}
				</p>
			</div>
		</Link>
	);
}
