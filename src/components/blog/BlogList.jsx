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
            <div className="flex items-center  py-5 gap-x-2">
                <button
                    className={` ${
                        typeFilter === "frontend"
                            ? "bg-blue-800 text-white"
                            : "text-blue-700"
                    } hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "frontend")}
                >
                    Frontend
                </button>
                <button
                    className={`${
                        typeFilter === "backend"
                            ? "bg-blue-800 text-white"
                            : "text-blue-700"
                    } hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                    onClick={() => handleFilterChange("category", "backend")}
                >
                    Backend
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto justify-center py-3 pb-10 gap-8">
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
