
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Collapse } from 'react-collapse'
import { FaAngleDown } from "react-icons/fa6";


import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import Rating from '@mui/material/Rating';


import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setDiscount, setPriceFilter } from '../../features/productsFilter/productsFilterSlice';

import { IoClose } from "react-icons/io5";
import { MyContext } from '../../contexts/MyContext';

const Sidebar = (props) => {
  const context = useContext(MyContext)
  const isFirstRender = useRef(true);


  const dispatch = useDispatch()

  const { filters } = useSelector(state => state.filterProducts);
const [price, setPrice] = useState([filters.minPrice || 100, filters.maxPrice || 50000]);



  //debounced price
    const [debouncedPrice, setDebouncedPrice] = useState(price);
     // Update debounced state after 500ms of no changes


  console.log(price)



  const{categories}=useSelector(state=>state.category)

    const[isCategoryFilterOpen,setIsCategoryFilterOpen]=useState(true)
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

        if (!debouncedPrice || debouncedPrice[0] === 100 && debouncedPrice[1] === 50000) {
    return; // skip initial run
  }

    if (debouncedPrice) {
      dispatch(setPriceFilter({ min: debouncedPrice[0], max: debouncedPrice[1] }));
    }
  }, [debouncedPrice, dispatch]);


  useEffect(() => {
  setPrice([filters.minPrice || 100, filters.maxPrice || 50000]);
}, [filters.minPrice, filters.maxPrice]);
  return (
  <aside className='sidebar py-1 lg:py-5 static lg:sticky top-[140px]  !z-[103] '>
    <div  className='flex justify-end lg:hidden'>
     <IoClose onClick={()=>context.setOpenFilter(false)}  className='!text-primary !top-10 text-[22px] !right-10'/>

    </div>
      <div className="box">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center lg:pr-5'>
            Shop By Categories

<Button className='!text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto ' onClick={()=>setIsCategoryFilterOpen(!isCategoryFilterOpen)}>

            <FaAngleDown style={{transform:isCategoryFilterOpen?'rotate(180deg)':'rotate(0deg)'}} className='transition-transform duration-300'  />
</Button>

            </h3>
        <Collapse isOpened={isCategoryFilterOpen}>




        <div className="scroll flex flex-wrap lg:relative   px-4 relative -left-[13px] ">
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
                className=' w-[100px] lg:w-full'
              />
            ))
          }
                
      


        </div>
        </Collapse>

      </div>
      <div className="box mt-2 lg:mt-3">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center lg:pr-5'>
            Availability

<Button className='!text-black !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto ' onClick={()=>setIsAvailabilityFilterOpen(!isAvailabilityFilterOpen)}>

            <FaAngleDown style={{transform:isAvailabilityFilterOpen?'rotate(180deg)':'rotate(0deg)'}} className='transition-transform duration-300'  />
</Button>

            </h3>
        <Collapse isOpened={isAvailabilityFilterOpen}>




        <div className="scroll flex flex-wrap  lg:block px-4 relative -left-[13px] ">
                  <FormControlLabel  control={<Checkbox size='small' />} label="Available  (17)" className='w-[200px] lg:w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="In Stock  (10)" className='w-[200px] lg:w-full' />
                  <FormControlLabel  control={<Checkbox size='small' />} label="Not Available  (17)" className='w-[200px] lg:w-full' />
                  


        </div>
        </Collapse>

      </div>

   <div className="box mt-2 lg:mt-4">
  <h3 className='w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>
    Discount
  </h3>
  <div className="scroll px-4 flex flex-wrap lg:block relative -left-[13px]">
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
        className="lg:w-full"
      />
    ))}
  </div>
</div>

      <div className="box mt-2 lg:mt-4 ">
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
      <div className="box mt-2 lg:mt-4 ">
        <h3 className=' w-full mb-3 text-[16px]
         font-[600] flex items-center pr-5'>
           Filter By Rating
            </h3>
            <div className="w-full">

      <Rating value={filters.rating||0} onChange={props.handleSelectRating} name="half-rating" precision={0.5} size='medium' />
            </div>
         
 

     
      </div>

      <Button onClick={()=>
        {dispatch(resetFilters())
                         window.scrollTo({ top: 0, behavior: "smooth" });


        }
        } className='!border-1 !border-primary !text-primary !mt-2 lg:!mt-3'>Clear Filters</Button>


  </aside>
  )
}

export default Sidebar
