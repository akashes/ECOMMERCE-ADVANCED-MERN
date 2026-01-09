import React from 'react'
import { IoIosTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DOMPurify from 'dompurify'

const BlogItem = ({blog}) => {

  const getCleanText = (html, length) => {
    const cleanText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    
    return cleanText.length > length 
      ? cleanText.substring(0, length) + "..." 
      : cleanText;
  };

  return (
    <div className='blogItem group cursor-pointer '>
        <div className="imgWrapper w-full overflow-hidden rounded-md  relative ">
            <img src={blog?.blogImage.url} 
            alt="blog-image" 
            className='w-full transition-all rotate-1 group-hover:scale-105 group-hover:rotate-0'
            />
            <span className='flex items-center justify-center text-white  absolute bottom-[15px] right-[15px] gap-1 text-[11px] font-[500] bg-primary  rounded-md p-1'>
                <IoIosTimer className='text-[18px]'/>
                {new Date(blog.createdAt).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}


            </span>

        </div>
        <div className="info py-4">
            <Link to='/' >
            <h2 className='text-[15px] font-[600] text-black mb-3'>
{getCleanText(blog?.title, 50)}              </h2>
            </Link>
            <p className='text-[14px] lg:text-[16px]  font-[400] text-[rgba(0,0,0,0.8)] mb-4'>
         <div>
{getCleanText(blog?.title, 50)}
         </div>
            </p>
                 <Link to={`/blog/${blog._id}`} className=' flex items-center  gap-1 link font-[500]   '>
                 Read More <MdKeyboardDoubleArrowRight className='group-hover:scale-150 group-hover:text-primary transition-all duration-300'/> </Link>

        </div>
     
    </div>
  )
}

export default BlogItem
