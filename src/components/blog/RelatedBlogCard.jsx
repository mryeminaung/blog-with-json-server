import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RelatedBlogCard = ({ blog, scrollToTop }) => {
    const [author, setAuthor] = useState();
    const search = `?${location.state?.search}` || "";
    const type = location.state?.type || "all";

    useEffect(() => {
        axios.get("http://localhost:8000/users").then((res) => {
            const auth = res.data.find((user) => user.id === blog.user_id);
            setAuthor(auth);
        });
    }, []);

    return (
        <Link
            key={blog.id}
            to={`/blogs/${blog.slug}`}
            onClick={scrollToTop}
            state={{ blog, author }}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <img
                className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-52 md:rounded-none md:rounded-s-lg"
                src="/src/assets/blog_img.jpg"
                alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {blog.body}
                </p>
            </div>
        </Link>
    );
};

export default RelatedBlogCard;
