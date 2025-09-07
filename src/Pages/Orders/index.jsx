
import { Button } from "@mui/material";
import AccountSidebar from "../../components/AccountSidebar";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { Collapse } from "react-collapse";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/order/orderSlice";


const Orders = () => {
  const[showProducts,setShowProducts]=useState(null)
  const dispatch = useDispatch()
  const{orders}=useSelector(state=>state.order)
  console.log(orders)
  const isShowOrderedProduct=(index)=>{
    if(showProducts===index){
      return setShowProducts(null)


    }
    setShowProducts(index)
  

  }
  console.log(showProducts)
  const[isOpen,setIsOpen]=useState(false)


  useEffect(()=>{
    dispatch(getOrders())

  },[])
  return (
      <section className="py-10 w-full">
    <div className="container flex  gap-5">
        <div className="col1 w-[20%]">
            <AccountSidebar/>
          
       

        </div>
        <div className="col2 w-[80%]">
             <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                 <h2>My Orders</h2>
          <p className="mt-0">
            There are <span className="font-bold text-primary">{orders?.length}</span> Orders
           
          </p>
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-gray-500  rtl:text-right">
            {/* order related heading */}
              <thead className="text-xs text-gray-700 bg-gray-50  ">
                <tr>
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
                    console.log(order)
                    return(
                      <>
                                      <tr className="bg-white border-b ">
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
                    <Badge status={order.order_status} />

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
 

                  </td>
           

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
