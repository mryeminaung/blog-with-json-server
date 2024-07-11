import axios from "axios";
import BlogCard from "./BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    let typeFilter = searchParams.get("category");
    typeFilter = typeFilter && typeFilter.toLowerCase();

    useEffect(() => {
        axios.get("http://localhost:8000/blogs").then((res) => {
            setBlogs(res.data);
        });
    }, []);

    const filteredBlogs =
        blogs && typeFilter
            ? blogs.filter((blog) => blog.category.toLowerCase() === typeFilter)
            : blogs;

    const handleFilterChange = (key, value) => {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    };

    return (
        <>
            <div className="flex items-center px-3 py-5 gap-x-2">
                <button
                    className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "health")}
                >
                    Health
                </button>
                <button
                    className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "football")}
                >
                    Football
                </button>
                <button
                    className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "it")}
                >
                    IT
                </button>
                <button
                    className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "beauty")}
                >
                    Beauty
                </button>
                {typeFilter && (
                    <button
                        className="underline text-blue-800"
                        onClick={() => handleFilterChange("category", null)}
                    >
                        Clear filters
                    </button>
                )}
            </div>
            <div className="flex flex-wrap justify-around py-3 gap-6">
                {filteredBlogs &&
                    filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            typeFilter={typeFilter}
                            searchParams={searchParams}
                        />
                    ))}
            </div>
        </>
    );
};

export default BlogList;
