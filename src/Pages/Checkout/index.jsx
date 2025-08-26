import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Radio, Tooltip } from '@mui/material';

import { BsFillBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import AddAddress from '../MyAccount/AddAddress';
import { MyContext } from '../../App';
import { AuthContext } from '../../contexts/AuthContext';
import { getAddress } from '../../features/user/userSlice';


const Checkout = () => {
    const{cart}=useSelector(state=>state.cart)
      const{openAddressPanel,setOpenAddressPanel}=useContext(MyContext)
      const{user}=useContext(AuthContext)
      console.log(user)
      const { address,loading:addressLoading } = useSelector(state => state.user)
      console.log(address)
      const [menu, setMenu] = useState(null);
      const[isChecked,setIsChecked]=useState(0)
      const [selectedAddress, setSelectedAddress] = useState(null);
      const [formData, setFormData] = useState({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        landmark: '',
        address_type: 'home'
      });
      const dispatch = useDispatch()
    
      const handleClick = (event, address) => {
        setMenu(event.currentTarget);
        setSelectedAddress(address);
      };
      const handleClose = () => {
        setMenu(null);
        setSelectedAddress(null);
      };
          const toggleDrawer = (newOpen) => {
    setOpenAddressPanel(newOpen);
  };

  const handleSelectedAddress=(e,id)=>{
    if(e.target.checked){
        setIsChecked(id)
    }
  }
  useEffect(() => {
    if (localStorage.getItem('user')) {
      
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData._id
      console.log(userId)
      async function getAddressDetails() {
        if (userId) {
          await dispatch(getAddress(userId))
        }
      }
      getAddressDetails()
    }
  }, [user])
  return (
    <>
    <section className="py-10 checkoutPage">
        <div className="w-[70%] m-auto flex  gap-5">
            <div className="leftCol w-[50%]">
                <div className="card bg-white shadow-md p-5 rounded-md w-full">
                    <div className="flex items-center justify-between gap-2">

                    <h2>Select Delivery Address</h2>
                    <Button onClick={()=>setOpenAddressPanel(true)} className='!border-1 !border-black !text-gray-600 text-capitalize !py-1'>
                        <IoMdAdd className='mr-1 '/>
                        Add New Address
                    </Button>
                    </div>
                    <br />
                    <div className="flex flex-col gap-4 ">
                        {
                            address?.length>0 ? [...address].reverse().map((item,index)=>(

                        <label key={item._id} className={`relative flex gap-3 p-4 border-1 border-[rgba(0,0,0,0.1)] rounded-md ${isChecked===item._id && 'bg-[#fff2f2]'}`}>
                            <div>

                         <Radio onChange={(e)=>handleSelectedAddress(e,item._id)} size='small' checked={isChecked===item._id}/>
                            </div>
                         <div className="info">
                            <span className='inline-block rounded-md p-1  bg-[#f1f1f1] text-[13px] font-[500]'>{item.address_type}</span>
                            <h3 className='capitalize'>{user?.name}</h3>
                            <p className='!my-0'> <span className='font-[600]'> {item.address_line}</span>,{item.city}, {item.state} -  {item.landmark}  </p>
                            <p className='!mb-0 font-[500] '>{item.mobile}</p>
                         </div>

                         <Button onClick={()=>{
                                      setFormData({
            address_line: item.address_line || '',
            city: item.city || '',
            state: item.state || '',
            pincode: item.pincode || '',
            country: item.country || '',
            mobile: item.mobile || '',
            landmark: item.landmark || '',
            address_type: item.address_type || 'home',
            _id: item._id
          })
          setOpenAddressPanel(true)
                         }}  size='small' className='!absolute right-3 top-[10%]  btn-sm  '>Edit</Button>
                        
                        </label>
                            )) : <>
                            <div className="flex p-5 items-center justify-between flex-col gap-1">
                                <img src=" https://res.cloudinary.com/dllelmzim/image/upload/v1756182792/relocation_b34ivq.png" width={80} alt="" className='mt-5' />
                                <h2 className='text-center'>No Addresses found in your account!</h2>
                                <p className='mt-0'>Add a delivery address.</p>
                                <Button onClick={()=>setOpenAddressPanel(true)}  className='btn-org '>ADD ADDRESS</Button>
                            </div>
                            </>
                        }
                    </div>
                  

                </div>

            </div>
            <div className="rightCol w-[50%]">
                <div className='card shadow-md bg-white p-5 rounded-md'>
                    <h2 className='mb-4'>Your Order</h2>
                    <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.2)]">
                        <span className='text-[14px] font[600]'>Product </span>
                        <span className='text-[14px] font[600]'>Subtotal </span>
                    </div>
                            <div className="scroll max-h-[300px] overflow-y-scroll overflow-x-hidden pr-2 mb-5 ">
                                    {
                                        cart?.length>0 && cart.map((item)=>(

                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src={item.productId?.images[0]?.url} alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <Tooltip title={item.productId.name}>

                                                            <Link to={`/product/${item.productId._id}`}  className='cursor-pointer text-[14px]'>{item.productId?.name.substr(0,20)+'...'}</Link>
                                                            </Tooltip>
                                                            <p className='text-[13px]'>Qty : {item?.quantity}</p>

                                                        </div>

                                                    </div>
                                                    <div className='part2 text-[14px] font-[500]'>
                                                        <div>

                                            {(item.quantity * item.productId.price)
                                            ?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                                        </div>
                                                      
                                                         <div className='text-[12px] font-bold'> ({item.quantity} X {item.productId.price})</div>  </div>

                                                </div>
                                        ))
                                    }

                                       
                            </div>

                            <Button className='w-full btn-org btn-lg flex gap-2 items-center '>
                                <BsFillBagCheckFill className='text-[20px]'/>
                                Checkout</Button>
                </div>
            </div>
            
        </div>
    </section>
        <AddAddress openAddressPanel={openAddressPanel} toggleDrawer={toggleDrawer} formData={formData}  setFormData={setFormData}  />
    

    </>
  )
}

export default Checkout
