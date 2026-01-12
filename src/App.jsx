import React, {  useContext, useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { MyContext } from './contexts/MyContext'
import './App.css'
import './responsive.css'








import  { Toaster } from 'react-hot-toast';

import axios from 'axios'

import { AuthContext } from './contexts/AuthContext'
import { getCartItems } from './features/cart/cartSlice'
import { useDispatch } from 'react-redux'

import { getWishlistItems } from './features/wishList/wishListSlice'
import { getAddress } from './features/user/userSlice'


import { router } from './router'

// export const MyContext=createContext();

axios.defaults.withCredentials=true
axios.defaults.baseURL=import.meta.env.VITE_API_URL
const HIDE_LAYOUT_PATHS = ["/order-success", "/order-failed"];

const App = () => {
  // const{loading}=useContext(AuthContext)
  const dispatch = useDispatch()
  

  const{user}=useContext(AuthContext)

  // const[isLogin,setIsLogin]=useState(false)
  const [openCartPanel,setOpenCartPanel]=useState(false)


    const[windowWidth,setWindowWidth]=useState(window.innerWidth)

    const[openFilter,setOpenFilter]=useState(false)
    const[isSearchOpen,setIsSearchOpen]=useState(false)
  
  

  
   const [openProductDetailsModal, setOpenProductDetailsModal] = React.useState({
    open:false,
    product:null
   });
   const[openAddressPanel,setOpenAddressPanel]=useState(false)
   console.log(openProductDetailsModal)
  //  const [maxWidth, setMaxWidth] = useState('lg');
  //      const [fullWidth, setFullWidth] = useState(true);
       
       
       
       
       
      //  const handleCloseProductDetailsModal = () => {
      //    setOpenProductDetailsModal({
      //     open:false,
      //     product:null
      //    });
      //   };
        
        // const openAlertBox=(status)=>{
        //   toast(status)
        // }
        
        const values={
          openProductDetailsModal,
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
    //   if(user){

    //     dispatch(getCartItems())
    //   }
  
    // },[user])
    // useEffect(()=>{
    //   if(user){

    //     dispatch(getAddress(user._id))
    //   }
  
    // },[user])


      // useEffect(() => {
      //    const run = async () => {
      //     if (!user) {
      //       dispatch(getWishlistItems(null));
      //       return;
      //     }
    
      //     const local = JSON.parse(localStorage.getItem("wishlist")) || [];
      //     setLocalWishlist(local);
    
      //     if (local.length === 0) {
      //       dispatch(getWishlistItems(user));
      //     } else {
      //       // confirm && 
      //       // setConfirmOpen(true); 
      //     }
      //   };
      //   if(user){

            
      //       run();
      //   }
      //  }
      // , [user, dispatch]);

      useEffect(()=>{
        if(user){
          Promise.all([dispatch(getCartItems()),
            dispatch(getAddress(user._id)),
            dispatch(getWishlistItems(user))
          ])
        }else{
          dispatch(getWishlistItems(null))
        }
      })

      useEffect(()=>{
        const handleResize=()=>{
          setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',handleResize)

        return()=>{
          window.removeEventListener('resize',handleResize)
        }
      },[dispatch])


  const isOrderTrackingPage = location.pathname.startsWith("/order/");

    const shouldHideHeaderFooter =
    HIDE_LAYOUT_PATHS.includes(location.pathname) || isOrderTrackingPage;


  return (
    <>
    <MyContext.Provider value={values}>
        <Toaster />
      {/* <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/products' element={<ProductListing/>}  />
        <Route path='/product/:id' element={<ProductDetails/>}  />
        <Route path='/blog/:id' element={<BlogDetails/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/register' element={<Register/>}  />
        <Route path='/cart' element={<CartPage/>}  />
        <Route path='/verify' element={<Verify resetPassword={false} />}  />
        <Route path='/verify-reset-password' element={<Verify resetPassword={true}/>}  />
        <Route path='/reset-password' element={<ResetPassword/>}  />
        <Route path='/checkout' element={<Checkout/>}  />
        <Route path='/order-success' element={<OrderSuccess/>}  />
        <Route path='/order-failed' element={<OrderFail/>}  />
        <Route path='/order/:orderId' element={<OrderTracking/>} />


        <Route path='/my-account' element={
          <PrivateRoute>
          <MyAccount/>
          </PrivateRoute>

          }  />
        <Route path='/my-list' element={<MyList/>}  />
        <Route path='/orders' element={<Orders/>}  />
        <Route path='/request-otp' element={<p>request otp</p>}/>
        <Route path='/address' element={<Address/>}/>
      </Routes> */}
      <RouterProvider router={router}/>




    

      {/* product details modal */}
    
    </MyContext.Provider>
  

    



    </>
  )
}

// const LayoutWrapper  =({children})=>{
//   const location = useLocation();
//   const isOrderTracking = location.pathname.startsWith('/order')
//   const shouldHide = HIDE_LAYOUT_PATHS.includes(location.pathname) || isOrderTracking;
//   return (
//     <>
//       {!shouldHide && <Header />}
//       {children}
//       {!shouldHide && <Footer />}
//     </>
//   );
// }

export default App
