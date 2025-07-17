import React, { useState } from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import DialogTitle from '@mui/material/DialogTitle';
import ProductZoom from './components/ProductZoom'

import { IoClose } from "react-icons/io5";
import ProductInfo from './components/ProductInfo'
import Login from './Pages/Login'
import Register from './Pages/Register'

export const MyContext=createContext();

const App = () => {
  
   const [openProductDetailsModal, setOpenProductDetailsModal] = React.useState(false);
   const [maxWidth, setMaxWidth] = useState('lg');
       const [fullWidth, setFullWidth] = useState(true);


       
       
       
       const handleCloseProductDetailsModal = () => {
         setOpenProductDetailsModal(false);
        };
        
        
        const values={
          setOpenProductDetailsModal
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
      </Routes>
       <Footer/>

    
    </MyContext.Provider>
    </BrowserRouter>


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
    </>
  )
}

export default App
