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
