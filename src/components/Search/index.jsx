import React, { useEffect, useState } from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { setSearch } from '../../features/productsFilter/productsFilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Search = () => {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const dispatch = useDispatch()
  const searchValue = useSelector(state => state.filterProducts.filters.search)
  const [name,setName]=useState('')

  const [debouncedName,setDebouncedName]=useState('')
  const[suggestions,setSuggestions]=useState([])
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
  if (suggestions.length === 0) return;

  if (e.key === "ArrowDown") {
    setHighlightIndex((prev) => (prev + 1) % suggestions.length);
  } else if (e.key === "ArrowUp") {
    setHighlightIndex((prev) =>
      prev <= 0 ? suggestions.length - 1 : prev - 1
    );
  } else if (e.key === "Enter" && highlightIndex >= 0) {
    handleSelect(suggestions[highlightIndex]);
  }
};
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
    const fetchSuggestions = async () => {
      if (!debouncedName.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(`/api/product/suggestions?query=${debouncedName}`);
        console.log(res)
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggestions();
  }, [debouncedName]);

  const handleSelect = (product) => {
    setName(product.name);
    setSuggestions([]);
    navigate(`/product/${product._id}`); // or /products?search=...
  };



    useEffect(() => {
    setName(searchValue || '')
  }, [searchValue])


const highlightMatch = (text, query) => {
  const regex = new RegExp(`(${query})`, "gi");

  const preview = text.substr(0, 20);

  return (
    <>
      {preview.split(regex).map((part, i) =>
        regex.test(part) ? <b key={i}>{part}</b> : part
      )}
      {text.length > 20 && '...'} 
    </>
  );
};



  
  return (
   <div className='relative w-full'>
      <div className='searchBox w-full h-[50px] bg-[#e5e5e5] rounded-[5px] p-2'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}

          type="text"
          placeholder='Search for Products...'
          className='w-full outline-none bg-transparent h-[35px] p-2 text-[14px]'
        />
        <Button className='!absolute top-[50%] right-[5px] -translate-y-[50%] !rounded-full !text-black'>
          <IoSearch className='text-[#4e4e4e] text-[20px]' />
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-[50px] w-full bg-white px-2 rounded shadow z-50">
  {suggestions.map((s, i) => (
    <li
      key={s._id}
      onClick={() => handleSelect(s)}
      className={`flex items-center gap-3 p-1 cursor-pointer text-sm border-b hover:bg-gray-100 border-[rgba(0,0,0,0.1)]
        ${highlightIndex === i ? "bg-gray-100" : "hover:bg-gray-50"}`}
    >
      <img  src={s.image} alt={s.name} className="w-12 h-12 object-cover rounded-md" />
      <div>
        <p className="text-[14px] font-[500]">{highlightMatch(s.name, debouncedName)}</p>
        <span className="text-[13px] text-gray-500">₹{s.price}</span>
      </div>
    </li>
  ))}
</ul>

      )}
    </div>
  )
}
export default Search
