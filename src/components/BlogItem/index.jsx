import React from 'react'
import { IoIosTimer } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const BlogItem = () => {
  return (
    <div className='blogItem group cursor-pointer '>
        <div className="imgWrapper w-full overflow-hidden rounded-md  relative ">
            <img src="https://serviceapi.spicezgold.com/download/1750304462017_1000005912.jpg" 
            alt="blog-image" 
            className='w-full transition-all rotate-1 group-hover:scale-105 group-hover:rotate-0'
            />
            <span className='flex items-center justify-center text-white  absolute bottom-[15px] right-[15px] gap-1 text-[11px] font-[500] bg-primary  rounded-md p-1'>
                <IoIosTimer className='text-[18px]'/>
                11 JULY 2025

            </span>

        </div>
        <div className="info py-4">
            <Link to='/'>
            <h2 className='text-[15px] font-[600] text-black'>This is the title of the Blog</h2>
            </Link>
            <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.8)] mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quibusdam inventore, repellat alias ratione dolore aspernatur blanditiis ea odit fuga vel 
                exercitationem, dolorum id! Et quam eum nulla
                 a velit laborum magni placeat in rem, reprehenderit quia 
                 qui quis omnis!</p>
                 <Link to='/' className=' flex items-center  gap-1 link font-[500]   '>
                 Read More <MdKeyboardDoubleArrowRight className='group-hover:scale-150 group-hover:text-primary transition-all duration-300'/> </Link>

        </div>
     
    </div>
  )
}

export default BlogItem
