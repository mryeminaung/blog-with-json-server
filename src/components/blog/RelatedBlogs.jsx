import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RelatedBlogCard from "./RelatedBlogCard";

const RelatedBlogs = () => {
    const [relatedBlogs, setRelatedBlogs] = useState();
    const [author, setAuthor] = useState();
    const { blogId } = useParams();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    useEffect(() => {
        axios.get("http://localhost:8000/blogs").then((res) => {
            const blogs = res.data.filter((blog) => blog.slug !== blogId);
            console.log(blogs, blogs.slice(5, 10));
            setRelatedBlogs(blogs.slice(0, 4));
        });
    }, [blogId]);

    return (
        <div>
            <h2 className="text-bold my-3 text-2xl text-center font-medium">
                Related Blogs
            </h2>
            <div className="space-y-3 px-5">
                {relatedBlogs && (
                    <>
                        {relatedBlogs.map((blog) => (
                            <RelatedBlogCard
                                key={blog.id}
                                blog={blog}
                                scrollToTop={scrollToTop}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default RelatedBlogs;
