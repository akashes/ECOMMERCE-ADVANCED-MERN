import React, {  useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'
import ProductDetails from './Pages/ProductDetails'
import { createContext } from 'react'



import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ProductZoom from './components/ProductZoom'

import { IoClose } from "react-icons/io5";
import ProductInfo from './components/ProductInfo'
import Login from './Pages/Login'
import Register from './Pages/Register'

import Drawer from '@mui/material/Drawer';

import { MdOutlineDelete } from "react-icons/md";
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'

import  { Toaster } from 'react-hot-toast';
import ForgotPassword from './Pages/ForgotPassword'




export const MyContext=createContext();

const App = () => {


  const [openCartPanel,setOpenCartPanel]=useState(false)
  
  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };
  
   const [openProductDetailsModal, setOpenProductDetailsModal] = React.useState(false);
   const [maxWidth, setMaxWidth] = useState('lg');
       const [fullWidth, setFullWidth] = useState(true);
       
       
       
       
       
       const handleCloseProductDetailsModal = () => {
         setOpenProductDetailsModal(false);
        };
        
        // const openAlertBox=(status)=>{
        //   toast(status)
        // }
        
        const values={
          setOpenProductDetailsModal,
          setOpenCartPanel,
          // openAlertBox, //passing function for toast using context //may change later 
        }

     
  return (
    <>
    <BrowserRouter>
    <MyContext.Provider value={values}>

      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/productListing' element={<ProductListing/>}  />
        <Route path='/productDetails/:id' element={<ProductDetails/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<Register/>}  />
        <Route path='/cart' element={<CartPage/>}  />
        <Route path='/verify' element={<Verify/>}  />
        <Route path='/forgot-password' element={<ForgotPassword/>}  />
      </Routes>
       <Footer/>

    
    </MyContext.Provider>

      {/* product details modal */}
     <Dialog
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
                maxWidth={maxWidth}
                fullWidth={fullWidth}

        className='productDetailsModal'
      >

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex items-center w-full productDetailsModalContainer relative ">
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute  !top-[15px] right-[15px] !bg-[#f1f1f1]'>
            <IoClose className='text-[20px] !text-black  cursor-pointer' onClick={handleCloseProductDetailsModal}/>

            </Button>
              <div className="col1 w-[40%] px-3 py-8">
                <ProductZoom/>
              </div>
              <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                <ProductInfo/>
              </div>

            </div>
          </DialogContentText>
        </DialogContent>
       
      </Dialog>

         {/* cart drawer */}
        <Drawer  open={openCartPanel} onClose={toggleCartPanel(false)} anchor='right' className='carPanel'>
          <div className="flex items-center justify-between py-3 px-4 gap-3 border-b-[1px] border-gray-300">
          <h4>Shopping Cart (1)</h4>

          <IoClose className='text-[20px] cursor-pointer ' onClick={toggleCartPanel(false)}/>
          </div>


          <div  className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4 relative ">
            {/* cartItem */}
            <div className="cartItem w-full flex items-center gap-4 border-b border-gray-300 py-3 ">
             <div className="img w-[25%] group overflow-hidden h-[80px] rounded-md">
              <Link className=' ' to='/product/23342'>
              <img className='group-hover:scale-110 transition-all w-full' src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
               alt="" />
              </Link>
             </div>
             <div className="info w-[75%] pr-6 relative">
              <h4 className='text-[14px] font-[500]'>
                <Link to='/product/23342' className='link '>
                Mens Cotton Casual Short Sleeve
                </Link>
              </h4>
              <p className="flex items-center gap-5 my-2">
                <span>Qty : <span>2</span></span>
                <span className='text-primary font-bold'>Price : <span > ₹ 1,999</span></span>
                
              </p>
              <MdOutlineDelete className='absolute right-[5px] top-[10px] text-[20px] cursor-pointer text-gray-500 link transition-all-'/>


               
             </div>
             

            </div>
            {/* cartItem */}
            <div className="cartItem w-full flex items-center gap-4 border-b border-gray-300 py-3 ">
             <div className="img w-[25%] group overflow-hidden h-[80px] rounded-md">
              <Link className=' ' to='/product/23342'>
              <img className='group-hover:scale-110 transition-all w-full' src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
               alt="" />
              </Link>
             </div>
             <div className="info w-[75%] pr-6 relative">
              <h4 className='text-[14px] font-[500]'>
                <Link to='/product/23342' className='link '>
                Mens Cotton Casual Short Sleeve
                </Link>
              </h4>
              <p className="flex items-center gap-5 my-2">
                <span>Qty : <span>2</span></span>
                <span className='text-primary font-bold'>Price : <span > ₹ 1,999</span></span>
                
              </p>
              <MdOutlineDelete className='absolute right-[5px] top-[10px] text-[20px] cursor-pointer text-gray-500 link transition-all-'/>


               
             </div>
             

            </div>
            {/* cartItem */}
            <div className="cartItem w-full flex items-center gap-4 border-b border-gray-300 py-3 ">
             <div className="img w-[25%] group overflow-hidden h-[80px] rounded-md">
              <Link className=' ' to='/product/23342'>
              <img className='group-hover:scale-110 transition-all w-full' src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
               alt="" />
              </Link>
             </div>
             <div className="info w-[75%] pr-6 relative">
              <h4 className='text-[14px] font-[500]'>
                <Link to='/product/23342' className='link '>
                Mens Cotton Casual Short Sleeve
                </Link>
              </h4>
              <p className="flex items-center gap-5 my-2">
                <span>Qty : <span>2</span></span>
                <span className='text-primary font-bold'>Price : <span > ₹ 1,999</span></span>
                
              </p>
              <MdOutlineDelete className='absolute right-[5px] top-[10px] text-[20px] cursor-pointer text-gray-500 link transition-all-'/>


               
             </div>
             

            </div>
            {/* cartItem */}
            <div className="cartItem w-full flex items-center gap-4 border-b border-gray-300 py-3 ">
             <div className="img w-[25%] group overflow-hidden h-[80px] rounded-md">
              <Link className=' ' to='/product/23342'>
              <img className='group-hover:scale-110 transition-all w-full' src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
               alt="" />
              </Link>
             </div>
             <div className="info w-[75%] pr-6 relative">
              <h4 className='text-[14px] font-[500]'>
                <Link to='/product/23342' className='link '>
                Mens Cotton Casual Short Sleeve
                </Link>
              </h4>
              <p className="flex items-center gap-5 my-2">
                <span>Qty : <span>2</span></span>
                <span className='text-primary font-bold'>Price : <span > ₹ 1,999</span></span>
                
              </p>
              <MdOutlineDelete className='absolute right-[5px] top-[10px] text-[20px] cursor-pointer text-gray-500 link transition-all-'/>


               
             </div>
             

            </div>
            {/* cartItem */}
            <div className="cartItem w-full flex items-center gap-4 border-b border-gray-300 py-3 ">
             <div className="img w-[25%] group overflow-hidden h-[80px] rounded-md">
              <Link className=' ' to='/product/23342'>
              <img className='group-hover:scale-110 transition-all w-full' src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"
               alt="" />
              </Link>
             </div>
             <div className="info w-[75%] pr-6 relative">
              <h4 className='text-[14px] font-[500]'>
                <Link to='/product/23342' className='link '>
                Mens Cotton Casual Short Sleeve
                </Link>
              </h4>
              <p className="flex items-center gap-5 my-2">
                <span>Qty : <span>2</span></span>
                <span className='text-primary font-bold'>Price : <span > ₹ 1,999</span></span>
                
              </p>
              <MdOutlineDelete className='absolute right-[5px] top-[10px] text-[20px] cursor-pointer text-gray-500 link transition-all-'/>


               
             </div>
             

            </div>
         
          
          
          </div>
     
        <div className="bottomSection absolute bottom-0 left-0 w-full px-">
            <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col items-center justify-between">
            <div className='flex items-center justify-between w-full'> 

            <span className='text-[14px] font-[600]'>1 item</span>
            <span className='text-primary font-bold' >₹ 1,999</span>
            </div>
            <div className='flex items-center justify-between w-full'> 

            <span className='text-[14px] font-[600]'>Shipping</span>
            <span className='text-primary font-bold' >₹ 50</span>
            </div>
          </div>
          <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col items-center justify-between">
            <div className='flex items-center justify-between w-full'> 

            <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
            <span className='text-primary font-bold' >₹ 1,999</span>
            </div>
            <div className='flex items-center justify-between w-full'> 

            <span className='text-[14px] font-[600]'>Total (tax incl.)</span>
            <span className='text-primary font-bold' >₹ 50</span>
            </div>
            <div className='flex items-center justify-between w-full'> 

            <span className='text-[14px] font-[600]'>Taxes:</span>
            <span className='text-primary font-bold' >₹ 50</span>
            </div>

            <div className="flex items-center justify-between w-full gap-5 mt-3">
              <Button className='btn-org btn-lg w-[50%]'>
                View Cart
              </Button>
              <Button className='btn-org btn-lg w-[50%]'>
                Checkout
              </Button>
            </div>
          </div>

        </div>
      </Drawer>
    </BrowserRouter>
          <Toaster />


    </>
  )
}

export default App
