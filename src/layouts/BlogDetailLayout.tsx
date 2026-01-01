import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { Outlet } from "react-router-dom";

export default function BlogLayout() {
	return (
		<div className="my-5 rounded-md p-2">
			<div className="flex gap-y-5 lg:gap-x-5 flex-col lg:flex-row rounded-md">
				<div className="p-4 w-full lg:w-4/6 rounded-md">
					<Outlet />
				</div>
				<div className="w-full lg:w-2/6 rounded-md">
					<RelatedBlogs />
				</div>
			</div>
		</div>
	);
}
