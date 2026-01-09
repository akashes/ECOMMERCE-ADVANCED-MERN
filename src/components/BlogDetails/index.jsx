import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogById, getAllBlogs } from "../../features/blog/blogSlice";
import BlogDetailsSkeleton from "../Skeltons/BlogDetailsSkelton";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Redux state
  const {blogs,loading} = useSelector((state) => state.blog);
  const blogFromRedux = blogs.find((b) => b._id === id);

  const [blog, setBlog] = useState(blogFromRedux || null);

  useEffect(() => {
    if (!blogFromRedux) {
      dispatch(fetchBlogById(id)).then((res) => {
        setBlog(res.payload);
      });
    } else {
      setBlog(blogFromRedux);
    }

    if (blogs.length === 0) {
      dispatch(getAllBlogs());
    }
  }, [id, blogFromRedux, dispatch, blogs.length]);

  useEffect(()=>{
       window.scrollTo({ top: 0, behavior: "smooth" });
 
 
   },[])
  if (loading) return  <BlogDetailsSkeleton/>

  const remainingBlogs = blogs.filter((b) => b._id !== id);

  return (
   
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Blog Content */}
        <div className="lg:w-[70%] w-full">
          <h1 className="text-2xl font-bold mb-4">{blog?.title}</h1>
          <img
            src={blog?.blogImage?.url}
            alt={blog?.title}
            className="w-full max-h-[400px] object-cover rounded-lg mb-6"
          />
          <div
            className="prose lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: blog?.description }}
          />
        </div>

        {/* Right Side: More Blogs */}
        <div className="blog-more-section lg:w-[30%] max-h-[90vh] overflow-y-scroll   w-full">
          <h2 className="text-xl font-semibold mb-6">More Blogs</h2>
          <div className="flex flex-col gap-6">
            {remainingBlogs.slice(0, 5).map((b) => (
              <div
                key={b._id}
                className="border-b pb-4 last:border-none"
              >
                <h3 onClick={()=>navigate(`/blog/${b?._id}`)} className="text-md font-semibold mb-2 cursor-pointer hover:text-primary transition-colors">{b.title}</h3>
                <img
                  src={b?.blogImage?.url}
                  alt={b.title}
                  className="w-full h-[120px] object-cover rounded-md mb-2"
                />
                <p className="text-sm text-gray-700">
                  {b.description.replace(/<[^>]+>/g, "").substr(0, 80)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
