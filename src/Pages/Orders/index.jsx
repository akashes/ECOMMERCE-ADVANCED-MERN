
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
                  orders?.length>0 && orders.map((order)=>{
                    console.log(order)
                    return(
                      <>
                                      <tr className="bg-white border-b ">
                  <td className="px-6 py-4 font-[500]">
                      <Button  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                    onClick={()=>isShowOrderedProduct(0)}
                    >
                      {
                        showProducts ===0 ? <FaAngleDown className="text-[16px] rotate-180 "/>: <FaAngleDown className="text-[16px] "/> 
                      }
                    </Button>

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    {order._id}

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    {order.payment_id} 

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    {order.name} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    {order.delivery_address?.mobile} 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="block w-[400px]">

                    sdaf asdf erwt asdf asdfasdf
                    </span>
 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    344355 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    1850 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    akashes5753279@gmail.com	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="text-primary">


                    6864d038228db479bb77c9a5 
                    </span>

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <Badge status="confirm" />

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    2025-07-20
 

                  </td>
           

                </tr>

                {
                  showProducts===0 && (
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
                  order?.products?.length>0 && order.products.map((order)=>{
                    return(
                         <tr className="bg-white border-b ">
                  <td className="px-6 py-4 font-[500] text-gray-700 ">
                    123456789

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src={order.image[0]} alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    2

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    133 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <span className="block w-[400px]">

                    675
                    </span>
 

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
