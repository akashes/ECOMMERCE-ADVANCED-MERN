import React, {  useContext, useEffect, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import './responsive.css'
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
import Checkout from './Pages/Checkout'
import MyAccount from './Pages/MyAccount'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import axios from 'axios'
import ResetPassword from './Pages/ForgotPassword'
import PrivateRoute from './components/PrivateRoute'
import { AuthContext } from './contexts/AuthContext'
import Address from './Pages/MyAccount/Address'
import { getCartItems, removeCartItem } from './features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showSuccess } from './utils/toastUtils'
import ScrollToTop from './utils/ScrollToTop'
import { getWishlistItems } from './features/wishList/wishListSlice'
import { getAddress } from './features/user/userSlice'
import OrderSuccess from './Pages/OrderSuccess'
import OrderFail from './Pages/OrderFail'



export const MyContext=createContext();

axios.defaults.withCredentials=true
axios.defaults.baseURL=import.meta.env.VITE_API_URL

const App = () => {
  const{loading}=useContext(AuthContext)
  const dispatch = useDispatch()
  

  const{user}=useContext(AuthContext)
  const{cart}=useSelector(state=>state.cart)

  // const[isLogin,setIsLogin]=useState(false)
  const [openCartPanel,setOpenCartPanel]=useState(false)
  const[confirm,setConfirm]=useState(false)
    const [localWishlist, setLocalWishlist] = useState([]);

    const[windowWidth,setWindowWidth]=useState(window.innerWidth)

    const[openFilter,setOpenFilter]=useState(false)
    const[isSearchOpen,setIsSearchOpen]=useState(false)
  
  

  
   const [openProductDetailsModal, setOpenProductDetailsModal] = React.useState({
    open:false,
    product:null
   });
   const[openAddressPanel,setOpenAddressPanel]=useState(false)
   console.log(openProductDetailsModal)
   const [maxWidth, setMaxWidth] = useState('lg');
       const [fullWidth, setFullWidth] = useState(true);
       
       
       
       
       
       const handleCloseProductDetailsModal = () => {
         setOpenProductDetailsModal({
          open:false,
          product:null
         });
        };
        
        // const openAlertBox=(status)=>{
        //   toast(status)
        // }
        
        const values={
          setOpenProductDetailsModal,
          setOpenCartPanel,
          openCartPanel,
          openAddressPanel,
          setOpenAddressPanel,
          windowWidth,
          openFilter,
          setOpenFilter,
          setIsSearchOpen,
          isSearchOpen
          // openAlertBox, //passing function for toast using context //may change later 
          // isLogin,
          // setIsLogin
        }

        // useEffect(()=>{

        //   const token=localStorage.getItem('accessToken')
        //   if(token!==null && token!==undefined && token!==''){
        //     setIsLogin(true)
        //   }else{
        //     setIsLogin(false)
        //   }

        // },[isLogin])

     
  //         if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="loader"></div> {/* or spinner UI */}
  //     </div>
  //   );
  // }

    useEffect(()=>{
      if(user){

        dispatch(getCartItems())
      }
  
    },[user])
    useEffect(()=>{
      if(user){

        dispatch(getAddress(user._id))
      }
  
    },[user])


      useEffect(() => {
         const run = async () => {
          if (!user) {
            dispatch(getWishlistItems(null));
            return;
          }
    
          const local = JSON.parse(localStorage.getItem("wishlist")) || [];
          setLocalWishlist(local);
    
          if (local.length === 0) {
            dispatch(getWishlistItems(user));
          } else {
            // confirm && 
            // setConfirmOpen(true); 
          }
        };
        if(user){

            
            run();
        }
       }
      , [user, dispatch]);

      useEffect(()=>{
        const handleResize=()=>{
          setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',handleResize)

        return()=>{
          window.removeEventListener('resize',handleResize)
        }
      },[dispatch])


  return (
    <>
    <BrowserRouter>
    <MyContext.Provider value={values}>


      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/products' element={<ProductListing/>}  />
        <Route path='/product/:id' element={<ProductDetails/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<Register/>}  />
        <Route path='/cart' element={<CartPage/>}  />
        <Route path='/verify' element={<Verify resetPassword={false} />}  />
        <Route path='/verify-reset-password' element={<Verify resetPassword={true}/>}  />
        <Route path='/reset-password' element={<ResetPassword/>}  />
        <Route path='/checkout' element={<Checkout/>}  />
        <Route path='/order-success' element={<OrderSuccess/>}  />
        <Route path='/order-failed' element={<OrderFail/>}  />
        


        <Route path='/my-account' element={
          <PrivateRoute>
          <MyAccount/>
          </PrivateRoute>

          }  />
        <Route path='/my-list' element={<MyList/>}  />
        <Route path='/my-orders' element={<Orders/>}  />
        <Route path='/request-otp' element={<p>request otp</p>}/>
        <Route path='/address' element={<Address/>}/>
      </Routes>
       <Footer/>

    

      {/* product details modal */}
      {
        openProductDetailsModal &&  <Dialog
        open={openProductDetailsModal.open}
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
                <ProductZoom images={ openProductDetailsModal?.product?.images} />
              </div>
              <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                <ProductInfo product={openProductDetailsModal?.product} />
              </div>

            </div>
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
      }
    </MyContext.Provider>

    

    </BrowserRouter>
          <Toaster />


    </>
  )
}

export default App
