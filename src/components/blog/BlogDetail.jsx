import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const BlogDetail = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state;

  const search = `?${location.state?.search}` || "";
  const type = location.state?.type || "all";

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete?")) {
      axios.delete(`http://localhost:8000/blogs/${id}`);
      navigate(`/blogs${search}`);
    }
  };

  return (
    blog && (
      <div className="flex items-start py-10 justify-center">
        <div className="w-[600px] bg-slate-200 border border-slate-300 p-3 rounded-md space-y-3 relative">
          {/* return pre page with the type filter effect */}

          <Link
            to={`..${search}`}
            relative="path"
            className="hover:bg-slate-600 bg-slate-500 text-white px-4 py-1 rounded-md"
          >
            Back to {type} blogs
          </Link>

          <div className="absolute bg-slate-300 rounded-md px-3 py-1 right-5 top-[60px]">
            {blog.category}
          </div>
          <img src={blog.blog_img} alt="" className="rounded-lg w-full" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <img
                src={blog.blog_img}
                alt=""
                className="object-fit w-12 h-12 rounded-full"
              />
              <div className="flex flex-col w-20 -space-y-1 text-[14px]">
                <span className="font-semibold">{blog.author}</span>
                <span className="">{blog.created_at}</span>
              </div>
            </div>
            {auth === blog.author && (
              <div className="space-x-3">
                <button className="px-3 py-1 bg-slate-400 rounded-md">
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-slate-400 rounded-md"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold">{blog.title}</h2>
          <p className="text-xl">{blog.body}</p>
        </div>
      </div>
    )
  );
};

export default BlogDetail;
