import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, typeFilter, searchParams }) => {
    const navigate = useNavigate();
    const [author, setAuthor] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/users").then((res) => {
            const auth = res.data.find((user) => user.id === blog.user_id);
            setAuthor(auth);
        });
    }, []);

    return (
        <div
            key={blog.id}
            className="overflow-hidden space-y-2 transform hover:scale-[1.02] duration-150 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
            <div className="w-full overflow-hidden rounded-t-lg">
                <img
                    src="/src/assets/blog_img.jpg"
                    alt=""
                    className="object-fill block h-[250px] w-full rounded-t-lg"
                />
            </div>
            <div className="p-3 space-y-2">
                <div className="flex items-center justify-between gap-x-2">
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
                            <span className="">
                                {blog.created_at} created_at
                            </span>
                        </div>
                    </div>
                    <span
                        className={`${
                            blog.category === "frontend"
                                ? "bg-blue-300"
                                : "bg-red-300"
                        } text-white text-md font-bold me-2 px-2.5 py-0.5 rounded-md dark:bg-blue-900 dark:text-blue-300`}
                    >
                        {blog.category}
                    </span>
                </div>
                <h2 className="font-bold text-xl">{blog.title}</h2>
                <p className="text-[15px] h-10 text-ellipsis overflow-clip">
                    {blog.body}
                </p>
                <div className="flex items-center justify-end">
                    <button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() =>
                            navigate(blog.slug, {
                                state: {
                                    blog,
                                    search: searchParams.toString(),
                                    type: typeFilter,
                                    author
                                },
                            })
                        }
                    >
                        Read more
                        <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
