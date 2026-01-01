import RelatedBlogs from "@/pages/blogs/RelatedBlogs";
import React from "react";

interface BlogDetailLayoutProps {
	children: React.ReactNode;
	currentBlogId?: string;
}

export default function BlogDetailLayout({
	children,
	currentBlogId,
}: BlogDetailLayoutProps) {
	return (
		<div className="mb-5 rounded-md">
			<div className="flex flex-col ">
				<div className="p-4 w-full rounded-md">{children}</div>

				<div className="w-full">
					{currentBlogId && <RelatedBlogs currentBlogId={currentBlogId} />}
				</div>
			</div>
		</div>
	);
}
