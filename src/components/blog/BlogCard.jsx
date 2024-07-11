import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, typeFilter, searchParams }) => {
  const navigate = useNavigate();

  return (
    <div
      key={blog.id}
      className="bg-slate-100 rounded-lg w-[350px] overflow-hidden space-y-2 p-2 transform hover:scale-105 duration-150"
    >
      <div className="w-full overflow-hidden rounded-md">
        <img
          src={blog.blog_img}
          alt=""
          className="object-fill h-[250px] w-full rounded-md transform hover:scale-110 duration-150"
        />
      </div>
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center flex-row justify-between gap-x-2">
            <img
              src={blog.blog_img}
              alt=""
              className="object-fit w-12 h-12 rounded-full"
            />

            <div className="flex flex-col w-20 -space-y-1 text-[14px]">
              <span className="">{blog.author}</span>
              <span className="">{blog.created_at}</span>
            </div>
          </div>
          <div className="bg-slate-400 text-[14px] px-2 rounded-md">
            {blog.category}
          </div>
        </div>
        <h2 className="font-bold text-xl">{blog.title}</h2>
        <p className="text-[15px] h-10 text-ellipsis overflow-clip">
          {blog.body}
        </p>
        <button
          className="hover:bg-slate-600 bg-slate-500 text-white px-2 w-full py-1.5 rounded-md"
          onClick={() =>
            navigate(blog.id, {
              state: {
                blog,
                search: searchParams.toString(),
                type: typeFilter,
              },
            })
          }
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
