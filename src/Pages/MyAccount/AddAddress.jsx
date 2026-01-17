import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import { IoCloseSharp } from 'react-icons/io5'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../../features/user/userSlice';
import { showError, showSuccess } from '../../utils/toastUtils';
const AddAddress = ({openAddressPanel,toggleDrawer,formData,setFormData}) => {

    const{addressLoading}=useSelector(state=>state.user)

    //   const [formData, setFormData] = useState({
    //     address_line: '',
    //     city: '',
    //     state: '',
    //     pincode: '',
    //     country: '',
    //     mobile: '',
    //     landmark: '',
    //     address_type: 'home'
    //   });
      const dispatch = useDispatch()

      const handleChange = (e) => {
        setFormData({ ...formData, address_type: e.target.value })
      }
    
      const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!formData.address_line || !formData.city || !formData.state ||
          !formData.pincode || !formData.country || !formData.mobile) {
        showError('All fields are required');
        return;
      }
     const pincodeRegex = /^\d{6}$/;
    
    if (!pincodeRegex.test(formData.pincode)) {
      showError('Please enter a valid 6-digit Pincode');
      return;
    }
    
      let resultAction;
    
      if (formData._id) {
        resultAction = await dispatch(updateAddress(formData));
      } else {
        resultAction = await dispatch(addAddress(formData));
      }
    
    
      if (addAddress.fulfilled.match(resultAction) || updateAddress.fulfilled.match(resultAction)) {
        setFormData({
          address_line: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          mobile:'',
          landmark:'',
          address_type:'home'
        });
        toggleDrawer(false);
        showSuccess(resultAction.payload.message || 'Address Saved successfully');
      } else {
        showError(resultAction.payload.message || 'Failed to save address');
        toggleDrawer(false);
      }
    };
    
    
  return (
    <Drawer open={openAddressPanel} onClose={() => {
        setFormData({
          address_line: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          mobile: '',
          landmark: '',
          address_type: 'home'
        })
        toggleDrawer(false)
      }} anchor='right'>
        <h3 className='py-5 px-4 text-[16px] font-[500] flex items-center justify-between'>
  {formData._id ? 'Edit Address' : 'Add Address'}
  <IoCloseSharp onClick={()=>toggleDrawer(false)} className='cursor-pointer text-[22px]' />
</h3>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-4'>
          <TextField label="Address (Area and Street)" variant="outlined" value={formData.address_line} onChange={(e) => setFormData({ ...formData, address_line: e.target.value })} />
          <TextField label="City" variant="outlined" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          <TextField label="State" variant="outlined" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
          <TextField label="Pincode" variant="outlined" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
          <TextField label="Country" variant="outlined" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
          <PhoneInput className="!w-full" defaultCountry="in" value={formData.mobile} onChange={(phone) => setFormData({ ...formData, mobile: phone })} />
          <TextField label="Landmark (Optional)" variant="outlined" value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} />
          <h3>Address type</h3>
          <div className='flex items-center gap-2'>
            <FormControlLabel control={<Radio checked={formData.address_type === 'home'} onChange={handleChange} value="home" name="radio-buttons" />} label="Home" className='!text-primary ' />
            <FormControlLabel control={<Radio checked={formData.address_type === 'work'} onChange={handleChange} value="work" name="radio-buttons" />} label="Work" className='!text-primary ' />
            <FormControlLabel control={<Radio checked={formData.address_type === 'other'} onChange={handleChange} value="other" name="radio-buttons" />} label="Other" className='!text-primary ' />
          </div>
          <Button className={`!bg-primary !text-white ${addressLoading && 'opacity-70'}`} disabled={addressLoading} type='submit' variant="contained">
            {addressLoading ? <CircularProgress size={25} className='!text-white' /> : (formData._id ? 'Update Address' : 'Add Address')}
          </Button>
        </form>
      </Drawer>
  )
}

export default AddAddress
