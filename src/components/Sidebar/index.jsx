
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Collapse } from 'react-collapse'
import { FaAngleDown } from "react-icons/fa6";


import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import Rating from '@mui/material/Rating';


import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDiscount, setPriceFilter } from '../../features/productsFilter/productsFilterSlice';

const Sidebar = (props) => {

  const dispatch = useDispatch()

  const { filters } = useSelector(state => state.filterProducts);
const [price, setPrice] = useState([filters.minPrice || 100, filters.maxPrice || 50000]);



  //debounced price
    const [debouncedPrice, setDebouncedPrice] = useState(price);
     // Update debounced state after 500ms of no changes


  console.log(price)



  const{categories}=useSelector(state=>state.category)

    const[isCategoryFilterOpen,setIsCategoryFilterOpen]=useState(false)
    const[isAvailabilityFilterOpen,setIsAvailabilityFilterOpen]=useState(false)
    const[isSizeFilterOpen,setIsSizeFilterOpen]=useState(false)


      useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(price);
    }, 500);

    return () => {
      clearTimeout(handler); 
    };
  }, [price]);


    useEffect(() => {
    if (debouncedPrice) {
      dispatch(setPriceFilter({ min: debouncedPrice[0], max: debouncedPrice[1] }));
    }
  }, [debouncedPrice, dispatch]);


  useEffect(() => {
  setPrice([filters.minPrice || 100, filters.maxPrice || 50000]);
}, [filters.minPrice, filters.maxPrice]);
  return (
  <aside className='sidebar py-5 sticky top-[140px] '>
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
          {
            categories?.length>0 && categories.map((category)=>(

              <FormControlLabel
                key={category._id}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.categories.includes(category._id)} 
                    onChange={() => props.onChange(category._id)} 
                  />
                }
                label={category.name}
                className="w-full"
              />
            ))
          }
                
      


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
   <div className="box mt-4">
  <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>
    Discount
  </h3>
  <div className="scroll px-4 relative -left-[13px]">
    {[10, 20, 30, 40, 50].map((percent) => (
      <FormControlLabel
        key={percent}
        control={
          <Checkbox
            size="small"
            checked={filters.discount === percent} 
            onChange={() =>{
              dispatch(setDiscount(percent))
            }}
          />
        }
        label={`${percent}% or more`}
        className="w-full"
      />
    ))}
  </div>
</div>

      <div className="box mt-4 ">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
           Filter By Price
            </h3>
 

      <RangeSlider 
      
      min={100}
      max={50000}
      onInput={setPrice}
      value={price}
      step={100}
      />
      <div className='flex py-2 pt-4 '>
        <span className='text-[13px]'>
            From : <strong >Rs:{price[0]} </strong>
        </span>
        <span  className='text-[13px] ml-auto'>
            To : <strong >Rs:{price[1]} </strong>
        </span>

      </div>
      </div>
      <div className="box mt-4 ">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
           Filter By Rating
            </h3>
            <div className="w-full">

      <Rating value={filters.rating||0} onChange={props.handleSelectRating} name="half-rating" precision={0.5} size='medium' />
            </div>
         
 

     
      </div>

  </aside>
  )
}

export default Sidebar
