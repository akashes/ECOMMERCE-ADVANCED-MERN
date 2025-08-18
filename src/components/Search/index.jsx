import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { setSearch } from '../../features/productsFilter/productsFilterSlice';
import { useDispatch, useSelector } from 'react-redux';



const Search = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector(state => state.filterProducts.filters.search)
  const [name,setName]=useState('')

  const [debouncedName,setDebouncedName]=useState('')

  useEffect(()=>{
    let handler= setTimeout(() => {
      setDebouncedName(name)
      
    }, 500);

    return()=>clearTimeout(handler)

    
  },[name])

  useEffect(()=>{
    dispatch(setSearch(debouncedName))

  },[dispatch,debouncedName])


    useEffect(() => {
    setName(searchValue || '')
  }, [searchValue])
  return (
    <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
     <input value={name}  onChange={(e)=>setName(e.target.value)} type="text" placeholder='Search for Products....' className='w-full  outline-none border-none bg-transparent h-[35px] p-2 text-[14px] ' />        
           <Button className='!absolute top-[50%] right-[5px] -translate-y-[50%] z-50 !w-[37px] !min-w-[37px] !min-h-[37px] !rounded-full !text-black'  >
            <IoSearch className='text-[#4e4e4e] text-[20px]'   />
           </Button>

        
      
    </div>
  )
}
export default Search
