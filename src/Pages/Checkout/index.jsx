import React from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { BsFillBagCheckFill } from "react-icons/bs";


const Checkout = () => {
  return (
    <section className="py-10 checkoutPage">
        <div className="container flex  gap-5">
            <div className="leftCol w-[70%]">
                <div className="card bg-white shadow-md p-5 rounded-md w-full">
                    <h1>Billing Details</h1>
                    <form action="" className="w-full mt-5">
                        <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                      <TextField className='w-full' label="Full Name" variant="outlined" size='small' />

                            </div>
                            <div className="col w-[50%]">
                                      <TextField type='email' className='w-full' label="Email" variant="outlined" size='small' />

                            </div>
                        </div>
                        <h6 className='text-[14px] font-[500] mb-3'>Street address *</h6>
                                   <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                      <TextField className='w-full' label="House No. and Street Name" variant="outlined" size='small' />

                            </div>
                          
                        </div>
                                   <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                      <TextField className='w-full' label="Apartment,suite,building,unit (optional)" variant="outlined" size='small' />

                            </div>
                          
                        </div>
                         <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                      <TextField className='w-full' label="City" variant="outlined" size='small' />

                            </div>
                            <div className="col w-[50%]">

                                      <TextField className='w-full' label="State / Country" variant="outlined" size='small' />

                            </div>
                          
                        </div>
                        <h6 className='text-[14px] font-[500] mb-3'>PostCode / ZIP *</h6>
                                 <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[100%]">
                                      <TextField className='w-full' label="Zip Code" variant="outlined" size='small' />

                            </div>
                         
                          
                        </div>

                              <div className="flex items-center gap-5 pb-5">
                            <div className="col w-[50%]">
                                      <TextField className='w-full' label="Phone Number" variant="outlined" size='small' />

                            </div>
                            <div className="col w-[50%]">

                                      <TextField className='w-full' label="Email Address" variant="outlined" size='small' />

                            </div>
                          
                        </div>




                    </form>

                </div>

            </div>
            <div className="rightCol w-[30%]">
                <div className='card shadow-md bg-white p-5 rounded-md'>
                    <h2 className='mb-4'>Your Order</h2>
                    <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.2)]">
                        <span className='text-[14px] font[600]'>Product </span>
                        <span className='text-[14px] font[600]'>Subtotal </span>
                    </div>
                            <div className="scroll max-h-[300px] overflow-y-scroll overflow-x-hidden pr-2 mb-5 ">

                                                    {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                                                {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                                                {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                                                {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                                                {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                                                {/* productItem */}
                                                <div className="flex items-center justify-between py-2">
                                                    <div className="part1 flex items-center gap-3">
                                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group cursor-pointer">
                                                            <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt="" 
                                                            className='w-full object-cover group-hover:scale-105 transition-transform ' />
                                                        </div>
                                                        <div className="info">
                                                            <h4 className='text-[14px]'>A Line Scarf Kurta...X1</h4>
                                                            <p className='text-[13px]'>Qty : 1</p>

                                                        </div>

                                                    </div>
                                                    <span className='part2 text-[14px] font-[500]'>₹ 1,999</span>

                                                </div>
                            </div>

                            <Button className='w-full btn-org btn-lg flex gap-2 items-center '>
                                <BsFillBagCheckFill className='text-[20px]'/>
                                Checkout</Button>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default Checkout
