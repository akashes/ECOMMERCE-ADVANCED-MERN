import React, { useState } from 'react'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';



const QtyBox = () => {
    const[qtyVal,setQtyValue]=useState(1)
    const increaseQty=()=>{
        setQtyValue(prev=>prev+1)
       
    }
    const decreaseQty=()=>{
         if(qtyVal===1){
            return
        }

        setQtyValue(prev=>prev-1)


    }
  return (
  <>
    <div className='qtyBox flex items-center relative  '>
<input value={qtyVal}  defaultValue={1} type="number" class="pl-5 w-full h-[40px] p-2 text-[15px] focus:outline-none  border border-gray-300  rounded-md" />
<div className="flex items-center flex-col 
justify-between h-[40px] absolute top-0 right-0 z-50 ">

      <Button className='!min-w-[25px] !h-[20px] !text-[#000] hover:!bg-[var(--primary)] hover:!text-white group '
      onClick={increaseQty}
      >
        <FaAngleUp className='text-[12px] opacity-55 group-hover:!opacity-100'/>
      </Button>
      <Button className='!min-w-[25px]  !h-[20px] !text-[#000] hover:!bg-[var(--primary)] hover:!text-white group'
      onClick={decreaseQty}
      >
        <FaAngleDown className='text-[12px] opacity-55  group-hover:!opacity-100' />
      </Button>
    </div>
</div>


    
  </>
  )
}

export default QtyBox
