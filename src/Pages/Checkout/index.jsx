import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Radio, Tooltip } from '@mui/material';

import { BsFillBagCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle, IoMdAdd } from 'react-icons/io';
import AddAddress from '../MyAccount/AddAddress';
import { MyContext } from '../../App';
import { AuthContext } from '../../contexts/AuthContext';
import { getAddress } from '../../features/user/userSlice';
import axios from 'axios';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils';
import { clearCart, deleteCart, removeCartItem } from '../../features/cart/cartSlice';
import { loadPaypalScript } from '../../utils/paypal';
import { SiRazorpay } from "react-icons/si";



const Checkout = () => {
    const{cart}=useSelector(state=>state.cart)
      const{openAddressPanel,setOpenAddressPanel}=useContext(MyContext)
      const{user}=useContext(AuthContext)
      const navigate = useNavigate()
      console.log(user)
      const { address,loading:addressLoading } = useSelector(state => state.user)
      console.log(address)
      const [menu, setMenu] = useState(null);
      const[isChecked,setIsChecked]=useState(0)
      const [convertedAmount, setConvertedAmount] = useState(0);

      
      const [selectedAddress, setSelectedAddress] = useState(null);
      console.log(isChecked)
      console.log(selectedAddress)
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
        setSelectedAddress(id)
    }
  }





  //razorpay
    const handlePayment=async(amount)=>{
    if(!user){
        showError('Please login to proceed')
        return
    }
    if(cart?.length===0 || !cart){
        showError('Your cart is empty')
    }
    if(!isChecked){
        showError('Please select a delivery address to proceed')
        return
    }
    const addressDetails=address.find(i=>i._id===isChecked)
 

    console.log(cart)


    let res;
   try{
     res = await axios.post('/api/payment/create-order', 
        {
        amount,name:user.name,
      products: cart
    .filter((i) => i?.productId)
    .map((i) => ({
      productId: i.productId._id,
      name: i.productId.name,
      image: i.productId.images?.[0]?.url || "", 
      price: i.productId.price || 0,
      quantity: i.quantity,
      subtotal: i.quantity * (i.productId.price || 0),
    }
)),
    }
)
          console.log(res)
        if(!res.data.success){
             navigate('/order-failed')

            showError(res.data.message || 'Failed to initiate payment')
            return
        }
   }catch(err){
    console.log(err)
                navigate('/order-failed')

    showError(err?.response?.data?.message || 'Failed to initiate payment')
    return
   }
  
 const {order} = res.data
 console.log(order)

   const options = {
        key:import.meta.env.VITE_RAZORPAY_API_KEY, 
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'CLASSY SHOP',
        description:'Ecommerce Website Payment',
        order_receipt: user.name ,
        order_id: order.id, // This is the order_id created in the backend
        //send payment detail to backend for verification
        handler:async function(response){
            console.log(response)
            let payload= {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        name:user.name,
        email:user.email,
       products: cart
    .filter((i) => i?.productId)
    .map((i) => ({
      productId: i.productId._id,
      name: i.productId.name,
      image: i.productId.images?.[0]?.url || "", 
      price: i.productId.price || 0,
      quantity: i.quantity,
      subtotal: i.quantity * (i.productId.price || 0),
    })),
        delivery_address:{
            address_line:addressDetails.address_line,
            city:addressDetails.city,
            state:addressDetails.state,
            country:addressDetails.country,
            pincode:addressDetails.pincode,
            mobile:addressDetails.mobile,
            landmark:addressDetails?.landmark, 
            address_type:addressDetails?.address_type, 
        },
        total:amount,
        date:new Date().toLocaleString('en-US',{
            month:'short',
            day:'2-digit',
            year:"numeric"
        }),
        payment_id:response.razorpay_payment_id,
        payment_status:"paid",
        payment_method:'razorpay'


      }
      console.log(payload)
      const result =       await axios.post("/api/payment/verify",  payload
        
    );

        console.log(result)
        if(!result.data.success){
            showError('Failed to Place Order')
            navigate('/order-failed')
            return
        }
        if(result.data.success){
            showSuccess( result?.data?.message || 'Order Placed Successfully')
            await dispatch(deleteCart())
            navigate('/order-success')

            return
        }


        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: addressDetails.mobile || ''
        },
        theme: {
          color: '#3399cc'
        //   color: '#ff5252'
        //   color: '#F37254'
        },
      }; 


      const rzp = new Razorpay(options);
      rzp.open();

    }



    //cod

    const handleCashOnDelivery=async(amount)=>{
    if(!user){
        showError('Please login to proceed')
        return
    }
        if(cart?.length===0 || !cart){
        showError('Your cart is empty')
    }
    if(!isChecked){
        showError('Please select a delivery address to proceed')
        return
    }
    const addressDetails=address.find(i=>i._id===isChecked)

              let payload= {
 
        name:user.name,
        email:user.email,
       products: cart
    .filter((i) => i?.productId)
    .map((i) => ({
      productId: i.productId._id,
      name: i.productId.name,
      image: i.productId.images?.[0]?.url || "", 
      price: i.productId.price || 0,
      quantity: i.quantity,
      subtotal: i.quantity * (i.productId.price || 0),
    })),
        delivery_address:{
            address_line:addressDetails.address_line,
            city:addressDetails.city,
            state:addressDetails.state,
            country:addressDetails.country,
            pincode:addressDetails.pincode,
            mobile:addressDetails.mobile,
            landmark:addressDetails?.landmark, 
            address_type:addressDetails?.address_type, 
        },
        total:amount,
        date:new Date().toLocaleString('en-US',{
            month:'short',
            day:'2-digit',
            year:"numeric"
        }),
        payment_status:"pending",
        payment_method:'cod'


      }

      try {
          const result =       await axios.post("/api/payment/cash-on-delivery",  payload
        
    );

        console.log(result)
        if(!result.data.success){
            showError( result?.data?.message|| 'Failed to Place Order')
                        navigate('/order-failed')

            return
        }
        if(result.data.success){
            showSuccess( result?.data?.message || 'Order Placed Successfully')
            await dispatch(deleteCart())
            navigate('/order-success')

            return
        }
        
      } catch (error) {
        console.log(error)
        showError(error?.response?.data?.message || 'Failed to Place Order using cash on Delivery')
        navigate('/order-failed')
        
      }
      
   

    }


const subTotal = cart?.reduce((acc, item) => {
  if (!item.productId) return acc; 
  return acc + (item.quantity * (item.productId.price || 0));
}, 0);   
 const isshippingCharge = subTotal < 249 && subTotal > 0 ? true : false;
 const total = isshippingCharge ? subTotal + 50 : subTotal;


useEffect(() => {
  if (address && address.length > 0) {
    const lastAddress = address[address.length - 1]; 
    setIsChecked(lastAddress._id);
    setSelectedAddress(lastAddress._id);
  }
}, [address]);


useEffect(() => {
  const paypalPayment = async () => {
    const result = await axios.get('/api/payment/get-paypal-client-key');
    if (!result.data.success) return;

    let clientId = result.data.clientId;

    await loadPaypalScript(clientId);

    if (window.paypal) {
      // Clear old buttons to avoid duplicates
      const container = document.getElementById("paypal-button-container");
      if (container) container.innerHTML = "";

 window.paypal.Buttons({
  createOrder: async function () {
    if (!isChecked) {
      showError("Please select a delivery address to proceed");
      throw new Error("No address selected");
    }

    if (!user) {
      showError("User not logged in");
      throw new Error("User not logged in");
    }

    if (!cart || cart.length === 0) {
      showError("Cart is empty");
      throw new Error("Cart is empty");
    }

    const resp = await fetch("https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR");
    const respData = await resp.json();
    let usdAmt = 0;
    if (respData.result === "success") {
      const rate = respData.conversion_rates.USD;
usdAmt = (total * rate).toFixed(2);
      console.log(usdAmt)
    }

    // Call backend to create order
    const res = await axios.post("/api/payment/create-paypal-order", {
      amount: usdAmt,
      products: cart
        .filter((i) => i?.productId)
        .map((i) => ({
          productId: i.productId._id,
          name: i.productId.name,
          image: i.productId.images?.[0]?.url || "",
          price: i.productId.price || 0,
          quantity: i.quantity,
          subtotal: i.quantity * (i.productId.price || 0),
        })),
    });

    console.log("PayPal createOrder response", res.data);

    return res.data.id;
  },

  onApprove: async function (data) {
    try {
      const addressDetails = address.find((i) => i._id === isChecked);
      if (!addressDetails) {
        showError("Invalid address selected");
        return;
      }

      let payload = {
        name: user.name,
        email: user.email,
        products: cart
          .filter((i) => i?.productId)
          .map((i) => ({
            productId: i.productId._id,
            name: i.productId.name,
            image: i.productId.images?.[0]?.url || "",
            price: i.productId.price || 0,
            quantity: i.quantity,
            subtotal: i.quantity * (i.productId.price || 0),
          })),
        delivery_address: {
          address_line: addressDetails.address_line,
          city: addressDetails.city,
          state: addressDetails.state,
          country: addressDetails.country,
          pincode: addressDetails.pincode,
          mobile: addressDetails.mobile,
          landmark: addressDetails?.landmark,
          address_type: addressDetails?.address_type,
        },
        total: total, // keep original INR total for DB
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        payment_status: "paid",
        payment_method: "paypal",
      };

      const res = await axios.post(`/api/payment/capture-paypal-order/${data.orderID}`, payload);

      if (res.data.success) {
        showSuccess("Order placed successfully via PayPal");
        dispatch(deleteCart());
        navigate("/order-success");
      } else {
                    navigate('/order-failed')

        showError(res.data.message || "Payment failed");
      }
    } catch (err) {
      console.error("PayPal onApprove error:", err);
                  navigate('/order-failed')

      showError(err?.response?.data?.message || "Payment failed");
    }
  },
}).render("#paypal-button-container");

    }
  };

  paypalPayment();
}, [isChecked, total, cart, user, address]);  


  useEffect(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });



  },[])
    useEffect(() => {
    if (localStorage.getItem('user')) {
      
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData._id || user._id
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
    <section className=" py-5 px-3 md:px-auto md:py-10 checkoutPage">
        <div className="w-full md:w-[70%] m-auto flex flex-col md:flex-row gap-2 md:gap-5">
            <div className="leftCol w-full md:w-[50%]">
                <div className="card bg-white shadow-md p-5 rounded-md w-full">
                    <div className="flex items-center justify-between gap-2">

                    <h2 className='text-[15px] md:text-[16px]'>Select Delivery Address</h2>
                    <Button onClick={()=>setOpenAddressPanel(true)} className='!border-1 !text-[12px] md:text-[14px] !border-black !text-gray-600 text-capitalize !py-1 text-nowrap'>
                        <IoMdAdd className='mr-1 '/>
                          Add  Address
                    </Button>
                    </div>
                    <div className=" mt-3 md:mt-5 flex flex-col  gap-2  md:gap-4 ">
                        {
                            address?.length>0 ? [...address].reverse().map((item,index)=>(

                        <label key={item._id} className={`relative flex gap-2 md:gap-3 p-1 md:p-4 border-1 border-[rgba(0,0,0,0.1)] rounded-md ${isChecked===item._id && 'bg-[#fff2f2]'}`}>
                            <div>

                         <Radio onChange={(e)=>handleSelectedAddress(e,item._id)} size='small' checked={isChecked===item._id}/>
                            </div>
                         <div className="info">
                            <span className='inline-block rounded-md p-1  bg-[#f1f1f1] text-[12px] md:text-[13px] font-[500]'>{item.address_type}</span>
                            <h3 className='capitalize text-[13px] md:text-[14px]'>{user?.name}</h3>
                            <p className='!my-0 !text-[12px] md:!text-[13px]'> <span className='font-[500]'> {item.address_line}</span>,{item.city}, {item.state} -  {item.landmark}  </p>
                            <p className='!mb-0 font-[500] !text-[12px] md:!text-[13px] '>{item.mobile}</p>
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
            <div className="rightCol w-full md:w-[50%]">
                <div className='card shadow-md bg-white p-5 rounded-md'>
                    <h2 className='mb-4'>Your Order</h2>
                    <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.2)]">
                        <span className='text-[14px] font[600]'>Product </span>
                        <span className='text-[14px] font[600]'>Subtotal </span>
                    </div>
                            <div className="scroll max-h-[300px] overflow-y-scroll overflow-x-hidden pr-2 mb-5 ">
                                    {
                                        cart?.length>0 && cart.map((item)=>{
                                            console.log(item)
                                         
                                            if(item.productId!==null){
                                                   const isGreaterThanStock = item.quantity>item.productId?.countInStock
                                            const isOutOfStock = item.productId?.countInStock===0

                                             return(
                                                      <div className={` ${isOutOfStock && 'bg-[#fff2f2] opacity-50 '}  relative flex flex-col gap-1 py-2 ${isGreaterThanStock && 'opacity-50'} ` }>

                                                        <IoIosCloseCircle onClick={()=>{
                                                            dispatch(removeCartItem(item._id))
                                                        }}  size={18} className=' text-primary absolute  left-[-1px] top-[-1px]  ' />
      

                                                 <div className=' flex items-center justify-between '>
                                                                  
                                                       <div className="part1 flex items-center gap-3 ">
                                     
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
                                                      
                                                         <div className='text-[12px] font-bold'> ({item.quantity} X {item.productId.price})</div> 
                                                          </div>
                                                 </div>









                                               <div>
                                                            {item.productId.countInStock===0 && <p className='font-bold text-primary text-center'>Out Of Stock</p>  }
                                                            {item.productId.countInStock>0 && item.quantity>item.productId.countInStock && <p className='font-bold text-primary text-center'>Not enough Stock available</p>  }
                                                          </div>

                                                        

                                                </div>
                                            )
                                        }
                                            return null

                                          
})
                                    }

                                       
                            </div>
                           <div>
                            <div className="flex items-center justify-between">
                                  <span className='text-[14px] font-[500]'>Subtotal</span>
                                  <span className='text-primary font-bold'> {subTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} </span>
                             </div>
                             <div className="flex items-center justify-between">
                                  <span className='text-[14px] font-[500]'>Shipping</span>
                                  <span className='font-bold text-primary'>{isshippingCharge?'50':"Free"}</span>
                             </div>
                             
                             <div className="flex items-center justify-between">
                                  <span className='text-[17px] font-[500]'>Total</span>
                                  <span className='font-bold text-primary text-[18px]'> {total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                           </div>
                           </div>
<div className='flex flex-col gap-3 mt-5'>

                            <Button onClick={()=>handlePayment(total)} className='w-full btn-org  flex gap-2 items-center '>
                                <SiRazorpay className='text-[20px]'/>
                                 Razorpay</Button>
                            <Button onClick={()=>handleCashOnDelivery(total)} className='w-full !bg-black !text-white flex !py-3 gap-2 items-center '>
                                <BsFillBagCheckFill className='text-[20px]'/>
                                Cash on Delivery</Button>
                                                                        <div className="flex items-center">
                                            <div id="paypal-button-container" className="w-full" />
                                            </div>
                                
</div>
                </div>
            </div>
            
        </div>
    </section>
        <AddAddress openAddressPanel={openAddressPanel} toggleDrawer={toggleDrawer} formData={formData}  setFormData={setFormData}  />
    

    </>
  )
}

export default Checkout
