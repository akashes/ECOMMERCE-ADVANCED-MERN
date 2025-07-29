import Button  from '@mui/material/Button';


import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';





const MyAccount = () => {
    const authContext = useContext(AuthContext)

    if(!authContext.isLogin) return <Navigate to='/login'/>
  return (  
      <section className="py-10 w-full ">
    <div className="container flex  gap-5
     ">
        <div className="col1 w-[20%] ">
            <AccountSidebar/>
          
       

        </div>
        <div className="col2 w-[70%]">
             <div className="card bg-white p-5 shadow-md rounded-md">
                <h2 className='pb-3'>My Profile</h2>
                <hr />
<form className='mt-5'>

                <div className="flex items-center gap-5 ">
                    <div className='w-[50%]'>
                    <TextField className='w-full' label="Full Name" variant="outlined" size='small' />
                    </div>
                    <div className='w-[50%]'>
                    <TextField className='w-full' label="Email" variant="outlined" size='small' />
                    </div>

                </div>
                <div className="flex items-center gap-5 mt-4 ">
                    <div className='w-[50%]'>
                    <TextField className='w-full' label="Phone No" variant="outlined" size='small' />
                    </div>
                  

                </div>
                <br />

                <div className="flex items-center gap-4">
                    <Button className='px-4 py-2 rounded  font-semibold 
  bg-gradient-to-tr from-[#ff7a7a] to-[#ec1616] !text-white w-[100px] '>Save</Button>
                    <Button className='px-4 py-2 rounded  font-semibold 
  bg-gradient-to-tr from-[#535353] to-[#030202] !text-white w-[100px] '>Cancel</Button>
                </div>
</form>


            </div>
         
        </div>
    </div>
  </section>


  )
}

export default MyAccount
