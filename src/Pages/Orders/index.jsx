
import { Button } from "@mui/material";
import AccountSidebar from "../../components/AccountSidebar";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../components/Badge";
import { Collapse } from "react-collapse";
import { useState } from "react";


const Orders = () => {
  const[showProducts,setShowProducts]=useState(null)
  const isShowOrderedProduct=(index)=>{
    if(showProducts===index){
      return setShowProducts(null)


    }
    setShowProducts(index)
  

  }
  console.log(showProducts)
  const[isOpen,setIsOpen]=useState(false)
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
            There are <span className="font-bold text-primary">3</span> Orders
           
          </p>
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right">
            {/* order related heading */}
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-400 ">
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    pay_QvJ5dNv8zOsr68 

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    Akash 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    913434455676 

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
                     <tr >
                  <td colSpan="6" className=" pl-20"  >
                     <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-400 ">
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
                {/* each product inside an order */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-[500] text-gray-700 ">
                    123456789

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

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
                {/* each product inside an order */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-[500] text-gray-700">
                    123456789

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

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
              
              </tbody>

            </table>
          </div>
                  </td>

                </tr>

                  )
                }
                {/* second order  */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-[500]">
                      <Button  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#cfcdcd] !text-black"
                    onClick={()=>isShowOrderedProduct(1)}
                    >
                      {
                        showProducts ===1 ? <FaAngleDown className="text-[16px] rotate-180 "/>: <FaAngleDown className="text-[16px] "/> 
                      }
                    </Button>

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500] text-primary">
                    pay_QvJ5dNv8zOsr68 

                  </td>
                  <td className="px-6 py-4 font-[500] whitespace-nowrap">
                    Akash 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    913434455676 

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
                  showProducts===1 && (
                     <tr >
                  <td colSpan="6" className=" pl-20"  >
                     <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-400 ">
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
                {/* each product inside an order */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-[500] text-gray-700">
                    123456789

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

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
                {/* each product inside an order */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-[500] text-gray-700">
                    123456789

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    687cd457228db479bb93f3a6	 

                  </td>
                  <td className="px-6 py-4 font-[500]">
                    <img src="https://serviceapi.spicezgold.com/download/1742452458052_gemini-refined-sunflower-oil-1-l-product-images-o490012719-p490012719-0-202308301722.webp" alt="" className="w-[40px] h-[40px] object-cover rounded-md" />

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
              
              </tbody>

            </table>
          </div>
                  </td>

                </tr>

                  )
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
