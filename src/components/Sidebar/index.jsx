
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Collapse } from 'react-collapse'
import { FaAngleDown } from "react-icons/fa6";


import { useState } from 'react';
import { Button } from '@mui/material';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import Rating from '@mui/material/Rating';


import './style.css'

const Sidebar = () => {
    const[isCategoryFilterOpen,setIsCategoryFilterOpen]=useState(false)
    const[isAvailabilityFilterOpen,setIsAvailabilityFilterOpen]=useState(false)
    const[isSizeFilterOpen,setIsSizeFilterOpen]=useState(false)
  return (
  <aside className='sidebar py-5'>
      <div className="box">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
            Shop By Categories

<Button className='!text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto ' onClick={()=>setIsCategoryFilterOpen(!isCategoryFilterOpen)}>

            <FaAngleDown style={{transform:isCategoryFilterOpen?'rotate(180deg)':'rotate(0deg)'}} className='transition-transform duration-300'  />
</Button>

            </h3>
        <Collapse isOpened={isCategoryFilterOpen}>




        <div className="scroll px-4 relative -left-[13px] ">
                  <FormControlLabel  control={<Checkbox size='small' />} label="Fashion" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Electronics" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Bags" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Footwear"  className='w-full'/>
                  <FormControlLabel  control={<Checkbox size='small' />} label="Groceries" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Beauty" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Wellness" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Jewellery" className='w-full' />
      


        </div>
        </Collapse>

      </div>
      <div className="box mt-3">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
            Availability

<Button className='!text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto ' onClick={()=>setIsAvailabilityFilterOpen(!isAvailabilityFilterOpen)}>

            <FaAngleDown style={{transform:isAvailabilityFilterOpen?'rotate(180deg)':'rotate(0deg)'}} className='transition-transform duration-300'  />
</Button>

            </h3>
        <Collapse isOpened={isAvailabilityFilterOpen}>




        <div className="scroll px-4 relative -left-[13px] ">
                  <FormControlLabel  control={<Checkbox size='small' />} label="Available  (17)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="In Stock  (10)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Not Available  (17)" className='w-full' />
                  


        </div>
        </Collapse>

      </div>
      <div className="box mt-3">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
            Size

<Button className='!text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto ' onClick={()=>setIsSizeFilterOpen(!isSizeFilterOpen)}>

            <FaAngleDown style={{transform:isSizeFilterOpen?'rotate(180deg)':'rotate(0deg)'}} className='transition-transform duration-300'  />
</Button>

            </h3>
        <Collapse isOpened={isSizeFilterOpen}>




        <div className="scroll px-4 relative -left-[13px] ">
                  <FormControlLabel  control={<Checkbox size='small' />} label="Small  (17)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Medium  (10)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Large  (17)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="XL  (17)" className='w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="XXL  (17)" className='w-full' />
                  


        </div>
        </Collapse>

      </div>
      <div className="box mt-4 ">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
           Filter By Price
            </h3>
 

      <RangeSlider/>
      <div className='flex py-2 pt-4 '>
        <span className='text-[13px]'>
            From : <strong >Rs:100 </strong>
        </span>
        <span  className='text-[13px] ml-auto'>
            From : <strong >Rs:300 </strong>
        </span>

      </div>
      </div>
      <div className="box mt-4 ">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
           Filter By Rating
            </h3>
            <div className="w-full">

            <Rating name="size-small" defaultValue={5} size="small" readOnly  />
            </div>
            <div className="w-full">
                
            <Rating name="size-small" defaultValue={4} size="small" readOnly />
            </div>
            <div className="w-full">

            <Rating name="size-small" defaultValue={3} size="small" readOnly />
            </div>
            <div className="w-full">

            <Rating name="size-small" defaultValue={2} size="small" readOnly />
            </div>
            <div className="w-full">
                
            <Rating name="size-small" defaultValue={1} size="small" readOnly />
            </div>
            
 

     
      </div>

  </aside>
  )
}

export default Sidebar
