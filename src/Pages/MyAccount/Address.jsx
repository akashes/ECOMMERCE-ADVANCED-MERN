import { Button, CircularProgress, Drawer, FormControlLabel, Menu, MenuItem, Radio, Select, TextField } from '@mui/material'
import React, { useEffect, useId, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { IoIosArrowDown } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, getAddress } from '../../features/user/userSlice'


import { IoMdMore } from "react-icons/io";


import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { showError, showSuccess, showWarning } from '../../utils/toastUtils'
import { IoCloseSharp } from 'react-icons/io5'

const Address = () => {

    const[isChangePasswordFormShow,setIsChangePasswordFormShow]=useState(false)
    const{address}=useSelector(state=>state.user)

      const [menu, setMenu] = React.useState(null);
  const openMenu = Boolean(menu);
  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };

    const dispatch = useDispatch()



    const[loading,setLoading]=useState(false)

     const [formData, setFormData] = useState({
            address_line: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile:'',
            landmark:'',
            address_type:'home'
});
const handleChange=(e)=>{
    setFormData({...formData,address_type:e.target.value})
}

     const handleSubmit=async(e)=>{
        e.preventDefault()
       if(!formData.address_line){
        showWarning('Please enter address line')
        return
       }
       if(!formData.city){
        showWarning('Please enter city')
        return
       }
       if(!formData.state){
        showWarning('Please enter state')
        return
       }
       if(!formData.pincode){
        showWarning('Please enter pincode')
        return
       }
       if(!formData.country){
        showWarning('Please enter country')
        return
       }
       if(!formData.mobile){
        showWarning('Please enter phone number')
        return
       }
       if(!formData.landmark){
        showWarning('Please enter landmark')
        return
           
       }
       if(formData.pincode.length>6 || formData.pincode.length<6){
        showWarning('Please enter a valid pincode')
        return
       }

       if(formData.mobile.length>13 || formData.mobile.length<13){
        showWarning('Please enter a valid phone number')
        return
       }
       setLoading(true)
       const resultAction = await dispatch(addAddress(formData))
       setLoading(false)
       console.log(resultAction)
       if(addAddress.fulfilled.match(resultAction)){

           setFormData({
               address_line: '',
               city: '',
               state: '',
               pincode: '',
               country: '',
               mobile:'',
               landmark:'',
               address_type:'home'
            })
            
            toggleDrawer(false)
            setTimeout(() => {
                showSuccess(resultAction.payload.message || 'Address added successfully')
                
            }, 500);


        return
       }
       if(addAddress.rejected.match(resultAction)){
        showError(resultAction.payload.message || 'Failed to add address')
        toggleDrawer(false)
        return
       }

     }
       const [open, setOpen] = React.useState(false);

    

  const toggleDrawer = (newOpen)  => {
    setOpen(newOpen);
  };

  const handleDelete=async(id)=>{
    const resultAction = await dispatch(deleteAddress(id))
    console.log(resultAction)
    if(deleteAddress.fulfilled.match(resultAction)){
        showSuccess(resultAction.payload.message || 'Address deleted successfully')
        handleClose()
        return
    }
    if(deleteAddress.rejected.match(resultAction)){
        showError(resultAction.payload.message || 'Failed to delete address')
        handleClose()
        return
    }
  }



    useEffect(()=>{
  if(localStorage.getItem('user')){
    const userData = JSON.parse(localStorage.getItem('user'))
    const userId = userData._id

    console.log('user id inside useeffect is',userId)

    async function getAddressDetails(){
    if(userId){
        console.log('calling')

      await dispatch(getAddress(userId))
    }
    
  }
   getAddressDetails()

  }

  


},[])

  return (
    <>
      <section className="py-10 w-full ">
      <div
        className="container flex  gap-5
     "
      >
        <div className="col1 w-[20%] ">
          <AccountSidebar />
        </div>
        <div className="col2 w-[50%]">
            
          <div className="card bg-white p-5  mb-5 shadow-md rounded-md relative">
            {/* <CircularProgress size={20} className="absolute right-5 !text-black "/> */}
            <div className="flex items-center justify-between pb-2">

            <h2 className="text-[20px]">Address</h2>
            </div>
            <hr className="text-gray-400" />
              {/* address section */}
              <div
              onClick={()=>setOpen(true)}
            //    onClick={()=>context.setIsAddProductModalOpen({
            //     open:true,
            //     modal:'Add New Address'
            //   })} 
              className="flex items-center justify-center p-5 rounded-md border  border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] cursor-pointer hover:bg-[#e5f5ff]">
                <span className='text-[14px] font-[500]'>Add Address</span>
              </div>
              <div className="flex gap-2 flex-col mt-4 ">

              {
                address?.length>0 && [...address].reverse().map((address)=>(
                    <label className="addressBox w-full bg-[#f1f1f1] p-3 rounded-md cursor-pointer flex items-center justify-between
                    border  border-dashed border-[rgba(0,0,0,0.3)] group
                    ">
          
                      <span className='text-[12px] inline-block p-3 group-hover:scale-110 transition-all  '>{address?.address_line } {address?.city} {address?.state} {address?.pincode}</span>
                      <div>
                         <Button
                         className='!w-[40px] !h-[40px] !min-w-[30px] flex items-center justify-center !rounded-full  !text-black opacity-60 group-hover:opacity-100 transition-all'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <IoMdMore         onClick={handleClick}
 className='text-[20px] text-gray-700' />
      </Button >
      <Menu
      className='!w-[200px] '
        id="basic-menu"
        anchorEl={menu}
        open={openMenu}
        onClose={handleClose}
        slotProps={{
    list: {
      'aria-labelledby': 'basic-button',
    },
    paper: {
      elevation: 0,
      sx: {
        boxShadow: '0 .5px .5px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
      },
    },
  }}
      >
        <MenuItem className='' onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={()=>handleDelete(address._id)}>Remove </MenuItem>
      </Menu>
                      </div>
                
                </label> 

                ))
              }
              </div>
   
          </div>

          


             
        </div>
      </div>
    </section>
    <Drawer open={open} onClose={()=>toggleDrawer(false)} anchor='right'>
   <h3 className='py-5 px-4 text-[16px] font-[500] flex items-center justify-between'>
            Add Address
             <IoCloseSharp onClick={()=>toggleDrawer(false)} className='cursor-pointer text-[22px]' />
                 </h3>      <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-4 min-w-[300px]' >
<TextField className='' id="outlined-basic" label="address_line" variant="outlined" value={formData.address_line} onChange={(e)=>setFormData({...formData,address_line:e.target.value})} />
<TextField id="outlined-basic" label="City" variant="outlined" value={formData.city} onChange={(e)=>setFormData({...formData,city:e.target.value})} />
        <TextField id="outlined-basic" label="State" variant="outlined"  value={formData.state} onChange={(e)=>setFormData({...formData,state:e.target.value})}/>
<TextField id="outlined-basic" label="Pincode" variant="outlined" value={formData.pincode} onChange={(e)=>setFormData({...formData,pincode:e.target.value})} />
<TextField id="outlined-basic" label="Country" variant="outlined" value={formData.country} onChange={(e)=>setFormData({...formData,country:e.target.value})} />
  <PhoneInput

                className="!w-full"
                  defaultCountry="in"
                  value={formData.mobile}
                  onChange={(phone) => {
                    setFormData({
                      ...formData,
                      mobile: phone,
                    });
                  }}
                />
<TextField id="outlined-basic" label="Landmark" variant="outlined" value={formData.landmark} onChange={(e)=>setFormData({...formData,landmark:e.target.value})} />

   <h3>Address type</h3>
   <div className='flex items-center gap-2'>

    <FormControlLabel

  control={
    <Radio
    className='!text-primary'
      checked={formData.address_type === 'home'}
      onChange={handleChange}
      value="home"
      name="radio-buttons"
    />
  }
  label="Home"
/>
<FormControlLabel
  control={
    <Radio
    className='!text-primary'

      checked={formData.address_type === 'work'}
      onChange={handleChange}
      value="work"
      name="radio-buttons"
    />
  }
  label="Work"
/>
<FormControlLabel
  control={
    <Radio
    className='!text-primary'

      checked={formData.address_type === 'other'}
      onChange={handleChange}
      value="other"
      name="radio-buttons"
    />
  }
  label="Other"
/>
   </div>


<Button className={`!bg-primary !text-white ${loading && 'opacity-70' }`} disabled={loading} type='submit' variant="contained"  >
    {
        loading ? <CircularProgress size={25} className='!text-white'/>:'Add Address'
    }
    </Button>
      </form>
      </Drawer>

    </>
  )
}


export default Address
