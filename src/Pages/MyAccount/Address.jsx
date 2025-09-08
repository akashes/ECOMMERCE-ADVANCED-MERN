import { Button, CircularProgress, Drawer, FormControlLabel, Menu, MenuItem, Radio, Skeleton, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, getAddress, updateAddress } from '../../features/user/userSlice'
import { IoMdAdd, IoMdMore } from "react-icons/io";

import { showError, showSuccess } from '../../utils/toastUtils'
import { FaHome } from 'react-icons/fa'
import { HiBuildingOffice } from "react-icons/hi2";
import { MdHomeWork } from 'react-icons/md'
import { AuthContext } from '../../contexts/AuthContext'
import { MyContext } from '../../App'
import AddAddress from './AddAddress'


const Address = () => {
  const{openAddressPanel,setOpenAddressPanel}=useContext(MyContext)
  const{context}=useContext(AuthContext)
  const { address,loading:addressLoading } = useSelector(state => state.user)
  const [menu, setMenu] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    mobile: '',
    landmark: '',
    address_type: 'home'
  });
  const dispatch = useDispatch()

  const handleClick = (event, address) => {
    setMenu(event.currentTarget);
    setSelectedAddress(address);
  };
  const handleClose = () => {
    setMenu(null);
    setSelectedAddress(null);
  };

//   const handleChange = (e) => {
//     setFormData({ ...formData, address_type: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.address_line || !formData.city || !formData.state ||
//       !formData.pincode || !formData.country || !formData.mobile) {
//     showError('All fields are required');
//     return;
//   }

//   let resultAction;

//   if (formData._id) {
//     resultAction = await dispatch(updateAddress(formData));
//   } else {
//     resultAction = await dispatch(addAddress(formData));
//   }


//   if (addAddress.fulfilled.match(resultAction) || updateAddress.fulfilled.match(resultAction)) {
//     setFormData({
//       address_line: '',
//       city: '',
//       state: '',
//       pincode: '',
//       country: '',
//       mobile:'',
//       landmark:'',
//       address_type:'home'
//     });
//     toggleDrawer(false);
//     showSuccess(resultAction.payload.message || 'Address Saved successfully');
//   } else {
//     showError(resultAction.payload.message || 'Failed to save address');
//     toggleDrawer(false);
//   }
// };




  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteAddress(id))
    if (deleteAddress.fulfilled.match(resultAction)) {
      showSuccess(resultAction.payload.message || 'Address deleted successfully')
      handleClose()
      return
    }
    if (deleteAddress.rejected.match(resultAction)) {
      showError(resultAction.payload.message || 'Failed to delete address')
      handleClose()
      return
    }
  }
    const toggleDrawer = (newOpen) => {
    setOpenAddressPanel(newOpen);
  };


      useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
  
  
    },[])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData._id
      console.log(userId)
      async function getAddressDetails() {
        if (userId) {
          await dispatch(getAddress(userId))
        }
      }
      getAddressDetails()
    }
  }, [context?.user])

  return (
    <>
      <section className=" py-5 lg:py-10 w-full ">
        <div className="container flex gap-5">
          <div className="col1 w-[20%] hidden lg:block ">
            <AccountSidebar />
          </div>
          <div className="col2 w-full lg:w-[50%]">
            <div className="card bg-white p-5 mb-5 shadow-md rounded-md relative">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-[20px]">Address</h2>
              </div>
              <hr className="text-gray-400" />
              <div onClick={() => setOpenAddressPanel(true)} className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.3)] bg-[#f1faff] cursor-pointer hover:bg-[#e5f5ff]">
                <span className='text-[14px] font-[500] flex items-center gap-1'>
                  <IoMdAdd/>
                  Add Address</span>
              </div>
              <div className="flex gap-2 flex-col mt-4 ">
                {address?.length > 0 && [...address].reverse().map((addr) => (
                  <label key={addr._id} className="addressBox w-full bg-[#f1f1f1] p-3 rounded-md cursor-pointer flex flex-col items-start justify-between border border-dashed border-[rgba(0,0,0,0.3)] group">
                    <span className='capitalize bg-gray-400 px-2 rounded-sm text-[13px] text-white flex gap-1 items-center'> {addr.address_type==='home'?<FaHome/>:addr.address_type==='work'?<HiBuildingOffice/>:<MdHomeWork/>}  {addr.address_type}</span>
                    <div className='flex justify-between items-center w-full'>
                      <span className='text-[12px] inline-block p-3 group-hover:scale-105 transition-all'>
                        <span className='font-[500]'>{addr.address_line}</span> {addr.city} {addr.state} {addr.mobile}
                      </span>
                      <div>
                        <Button className='!w-[40px] !h-[40px] !min-w-[30px] flex items-center justify-center !rounded-full !text-gray-700 opacity-60 group-hover:opacity-100 transition-all'
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(e) => handleClick(e, addr)}
                        >
                          <IoMdMore className='text-[20px] text-gray-700' />
                        </Button>
                      </div>
                    </div>
                  </label>
                ))}
                
                {
                  addressLoading &&  <div className="addressBox w-full bg-[#f9f9f9] p-3 rounded-md border border-dashed border-[rgba(0,0,0,0.1)]">
      <Skeleton variant="rectangular" width={60} height={24} className="mb-2 rounded" />

      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="50%" height={20} />
    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <Menu
        className='!w-[200px]'
        id="basic-menu"
        anchorEl={menu}
        open={Boolean(menu)}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': 'basic-button' },
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
        <MenuItem 
        className='!text-gray-700'
        onClick={() => {
          setFormData({
            address_line: selectedAddress.address_line || '',
            city: selectedAddress.city || '',
            state: selectedAddress.state || '',
            pincode: selectedAddress.pincode || '',
            country: selectedAddress.country || '',
            mobile: selectedAddress.mobile || '',
            landmark: selectedAddress.landmark || '',
            address_type: selectedAddress.address_type || 'home',
            _id: selectedAddress._id
          })
          setOpenAddressPanel(true)
          handleClose()
        }}>Edit</MenuItem>
        <MenuItem         className='!text-gray-700'

onClick={() => handleDelete(selectedAddress._id)}>Remove</MenuItem>
      </Menu>

    <AddAddress openAddressPanel={openAddressPanel} toggleDrawer={toggleDrawer} formData={formData}  setFormData={setFormData}  />
    </>
  )
}

export default Address
