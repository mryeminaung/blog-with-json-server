import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const BlogDetail = () => {
	const { auth } = useAuthContext();
	const location = useLocation();
	const navigate = useNavigate();
	const { blog, author } = location.state;
	console.log(author);
	const search = `${location.state?.search}` || "";
	const type = location.state?.type || "all";

	const handleDelete = (id) => {
		if (confirm("Are you sure to delete?")) {
			axios.delete(`http://localhost:8000/blogs/${id}`);
			navigate(`/blogs?${search}`);
		}
	};

	return (
		blog && (
			<>
				{/* return pre page with the type filter effect */}
				<Link
					to={`..${type != "all" ? `?${search}` : ""}`}
					relative="path"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					Back to {type} blogs
				</Link>

				<div className="mt-5 overflow-hidden rounded-lg space-y-3 relative">
					<img
						src="/src/assets/blog_img.jpg"
						alt="blog img"
						className="overflow-hidden rounded-t-lg w-full"
					/>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-2">
							<div className="m-2 flex items-center justify-between gap-x-2">
								<div className="flex items-center flex-row justify-between gap-x-2">
									<img
										src={author ? author.avatar : ""}
										alt=""
										className="object-fit w-12 h-12 border  border-blue-500 rounded-full"
									/>

									<div className="flex flex-col w-20 -space-y-0.5 text-[14px]">
										<span className="dark:text-white font-bold capitalize">
											{author && author.username}
										</span>
										<span className="">{blog.created_at} created_at</span>
									</div>
									<span
										className={`${
											blog.category === "frontend"
												? "bg-blue-300"
												: "bg-red-300"
										} text-white text-md font-bold me-2 px-2.5 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-300`}>
										{blog.category}
									</span>
								</div>
							</div>
						</div>

						{auth.id === blog.user_id && (
							<div className="space-x-3">
								<button className="px-3 py-1 bg-slate-400 rounded-md">
									Edit
								</button>
								<button
									className="px-3 py-1 bg-slate-400 rounded-md"
									onClick={() => handleDelete(blog.id)}>
									Delete
								</button>
							</div>
						)}
					</div>
					<div className="px-3">
						<h2 className="text-2xl font-bold">{blog.title}</h2>
						<p className="text-xl">{blog.body}</p>
					</div>
				</div>
			</>
		)
	);
};

export default BlogDetail;
