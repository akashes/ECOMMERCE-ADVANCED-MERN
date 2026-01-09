
import { Box, Button, Chip, DialogActions, DialogContent, Typography } from "@mui/material";
import AccountSidebar from "../../components/AccountSidebar";
import { FaAngleDown } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrders } from "../../features/order/orderSlice";
import { FaExpandAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";







import {Dialog} from "@mui/material";



import { styled } from "@mui/material/styles";
import { CiWarning } from "react-icons/ci";
import { showError, showSuccess } from "../../utils/toastUtils";
import OrdersSkeleton from "../../components/Skeltons/OrdersSkelton";

// Custom styled dialog
const DarkDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#1e293b", // Dark blue-gray
    color: "#fff",
    borderRadius: "12px",
    padding: theme.spacing(1),
    minWidth: 400,
  },
}));

  function WarningDialog({ open,handleClose,targetFn }) {
  return (
    <DarkDialog open={open} onClose={handleClose}>
      <DialogContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CiWarning size={28} color="#f87171" />
        </Box>
        <Box>
          <Typography className="text-white" variant="h6" sx={{ fontWeight: 600 }}>
            Do You Want to Cancel this Order ?  <span className="text-primary"></span>
          </Typography>
          <Typography className="!text-gray-400" variant="body2" sx={{ color: "#cbd5e1", mt: 1 }}>
            This Action cannot be undone
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#334155",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#475569" },
          }}
          onClick={
            ()=>{
                handleClose()
            
            }
          }
        >
          leave
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ef4444",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#dc2626" },
          }}
          onClick={()=>{
            targetFn()
            handleClose()
          }}
          autoFocus
        >
          Cancel Order
        </Button>
      </DialogActions>
    </DarkDialog>
  );
}
1

const Orders = () => {
  const[showProducts,setShowProducts]=useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{orders,cancelledOrders,loading}=useSelector(state=>state.order)
const [selectedOrderId, setSelectedOrderId] = useState(null);

console.log(orders)
  const isShowOrderedProduct=(index)=>{
    if(showProducts===index){
      return setShowProducts(null)


    }
    setShowProducts(index)
  

  }
  const[open,setOpen]=useState(false)
  const handleOpen=(id)=>{
    setSelectedOrderId(id)
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
    setSelectedOrderId(null)
  }

//cancel order request
const handleCancelOrder = async (orderId) => {

  try {
    const resultAction =await dispatch(cancelOrder(orderId))
    if(cancelOrder.fulfilled.match(resultAction)){
      showSuccess(resultAction.payload.message || 'Order Cancelled Successfully')
    }
    if(cancelOrder.rejected.match(resultAction)){
      showError(resultAction.payload.message || 'Failed to cancel Order')
    }
    
  } catch (error) {
    showError(error.response?.data?.message || error.message);
  }
};


  const getStatusChip = (status) => {
  const colorMap = {
    pending: { label: "Pending", color: "warning" },
    confirmed: { label: "Confirmed", color: "info" },
    shipped: { label: "Shipped", color: "primary" },
    "on-the-way": { label: "On the Way", color: "secondary" },
    delivered: { label: "Delivered", color: "success" },
    "cancel-requested": { label: "cancel Requested", color: "error" },
    cancelled: { label: "cancelled", color: "error" },
  };

  const { label, color } = colorMap[status] || { label: status, color: "default" };
  return <Chip label={label} color={color} size="small" className="font-bold" />;
};

  console.log(showProducts)
  const[isOpen,setIsOpen]=useState(false)

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
  
  
    },[])

  useEffect(()=>{
    dispatch(getOrders())

    
  },[])
  console.log(orders)
  return (
      <section className="py-5 lg:py-10 w-full">
        <WarningDialog
        open={open}
        handleClose={handleClose}
        targetFn={()=>handleCancelOrder(selectedOrderId)}
        />
    <div className="container flex  gap-5">
        <div className="col1 w-[20%] hidden lg:block">
            <AccountSidebar/>
          
       

        </div>
        <div className="col2  w-full lg:w-[80%]">
             <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                 <h2>My Orders</h2>
          <p className="mt-0">
            There are <span className="font-bold text-primary">{orders?.length}</span> Orders
           
          </p>
          <div className="relative overflow-x-auto mt-5">
            {
              loading?(
                <OrdersSkeleton/>
              ): orders?.length===0 ? (
 <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                  }}
                >
                  <div>
                    <img width={60} height={60} src="https://res.cloudinary.com/dllelmzim/image/upload/v1759721089/no-order_2_g1jkqu.png" alt="" />
                  </div>
                  <Typography variant="h6" color="textSecondary">
                    No orders found!
                  </Typography>
                </Box>
              ):
               (

            <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
            {/* order related heading */}
              <thead className="text-xs text-gray-700 bg-gray-50  ">
                <tr>
                  <th></th>
                  <th scope="col" className="py-3 px-6">
                    &nbsp;

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Order Id 

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Payment Id

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Phone No.

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Address

                  </th>
                  <th scope="col" className="py-3 px-6">
                    PinCode

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Total Amount

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    User Id

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Order Status

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date

                  </th>
                </tr>
              </thead>

              {/* order related table body */}
              <tbody>
                {
                  orders?.length>0 && orders.map((order,index)=>{
let cancelledOrder = 
  cancelledOrders.includes(order._id) || 
  order.order_status === 'cancelled' 
  // order.order_status === 'cancel-requested';
                    return(
                      <>
                                      <tr className={`bg-white border-b ${cancelledOrder && 'opacity-50 ' }`}>
                  <td className="px-6 py-4 font-[500]">
                      <Button onClick={()=>navigate(`/order/${order._id}`)}  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black">
                        <FaExpandAlt/>
                  
                    </Button>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                      <Button  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                    onClick={()=>isShowOrderedProduct(index)}
                    >
                      {
                        showProducts ===index ? <FaAngleDown className="text-[16px] rotate-180 "/>: <FaAngleDown className="text-[16px] "/> 
                      }
                    </Button>

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    {order._id}

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    {order.payment_id?order.payment_id:'CASH ON DELIVERY'} 

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    {order.name.toUpperCase()} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {order.delivery_address?.mobile} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="block w-[400px]">
                      {order.delivery_address?.address_line} {order.delivery_address?.city}    {order.delivery_address?.pincode}  {order.delivery_address?.state}  {order.delivery_address?.country}  {order.delivery_address?.landmark},

                    </span>
 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {order.delivery_address?.pincode} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
{order.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {order.email}	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="text-primary">


                   {order.userId}
                    </span>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {getStatusChip(order.order_status)}

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
 

                  </td>
                  {
                    !cancelledOrder &&
                  <td className="px-6 py-4 font-[500]">
{order.payment_method === "cod" &&
 order.order_status !== "delivered" &&
 !cancelledOrder && (
    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={() => handleOpen(order._id)}
    >
      Cancel Order
    </Button>
)}


</td>
                  }

           

                </tr>

                {
                  showProducts===index && (
                     <tr  >
                  <td colSpan="6" className=" pl-20"  >
                     <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50 ">
                <tr>
               
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Product Id

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Product Title

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Image

                  </th>
                  <th scope="col" className="py-3 px-6 whitespace-nowrap">
                    Quantity

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price

                  </th>
                  <th scope="col" className="py-3 px-6">
                    Sub Total

                  </th>
                
                </tr>
              </thead>
              <tbody>
                {
                  order?.products?.length>0 && order.products.map((product)=>{
                    return(
                         <tr key={product.productId} className="bg-white border-b ">
                  <td className="px-6 py-4 font-[500] text-gray-700 ">
                    {product.productId}

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <div className="w-[200px]">

                    {product.name}	 
                    </div>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src={product.image[0]} alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    {product.quantity}

                  </td>
                  <td className="px-6 py-4 font-[500]">
{product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="block w-[400px]">

{product.subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}                    </span>
 

                  </td>
                
           

                </tr>
                    )

                  })
                }
             
               
              
              </tbody>

            </table>
          </div>
                  </td>

                </tr>

                  )
                }
           
                      </>

                    )
                  })
                }


               
              </tbody>

            </table>
              )

            }

          </div>

            </div>
            {/* cart Item  */}
          
          
           
          </div>
        </div>
    </div>
    
  </section>
  )
}

export default Orders
