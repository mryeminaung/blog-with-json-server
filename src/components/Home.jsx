import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000/blogs").then((res) => {
      setLatestBlogs(res.data);
    });
  }, []);

  return (
    <div className="my-3 hidden">
      <div className="">
        <h2 className="text-3xl font-semibold border-b-2 pb-2 border-b-slate-400">
          Latest Blogs
        </h2>
        {latestBlogs && console.log(latestBlogs)}
      </div>
    </div>
  );
};

export default Home;
