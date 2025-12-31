import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";

const NewBlog = () => {
	const { auth } = useAuthContext();
	const navigate = useNavigate();

	const [newBlog, setNewBlog] = useState({
		title: "",
		body: "",
		category: "",
		user_id: auth.id,
	});

	const addBlog = async () => {
		axios.post("http://localhost:8000/blogs", {
			...newBlog,
			blog_img: "",
			slug: newBlog.title.split(" ").join("-").toLowerCase(),
			created_at: "",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newBlog);
		addBlog();
		navigate("/blogs");
	};

	const handleNewBlog = (e) => {
		const { name, value } = e.target;
		setNewBlog((preData) => ({ ...preData, [name]: value }));
	};

	return (
		<form
			action=""
			className="max-w-125 mx-auto my-20 border p-4 space-y-3 rounded-md"
			onSubmit={handleSubmit}
			autoComplete="off">
			<h2 className="font-bold text-xl text-center my-4">Create a new blog</h2>

			<div className="mb-5">
				<label
					htmlFor="title"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={newBlog.title}
					onChange={handleNewBlog}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
					required
				/>
			</div>

			<label
				htmlFor="category"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				Category
			</label>
			<select
				id="category"
				name="category"
				value={newBlog.category}
				onChange={handleNewBlog}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
			</select>

			<div className="mb-5">
				<label
					htmlFor="body"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Content
				</label>
				<textarea
					id="body"
					name="body"
					value={newBlog.body}
					onChange={handleNewBlog}
					rows={4}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Type here"
				/>
			</div>

			<div className="flex space-x-4">
				<button
					type="button"
					onClick={() => navigate("/blogs")}
					className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Cancel
				</button>
				<button
					type="submit"
					className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Create
				</button>
			</div>
		</form>
	);
};

export default NewBlog;
