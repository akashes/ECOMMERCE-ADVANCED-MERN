import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { IoCloseSharp } from "react-icons/io5";

import { useContext} from 'react';
import CategoryCollapse from '../../CategoryCollapse';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button'
import { AuthContext } from '../../../contexts/AuthContext';
import { MyContext } from '../../../contexts/MyContext';
import { useNavigate } from 'react-router-dom';


const CategoryPanel = (props) => {
  const{categories}=useSelector(state=>state.category)
  const authContext = useContext(AuthContext)
  const context = useContext(MyContext)
  const navigate = useNavigate()


 


    const DrawerList = (
    <Box 
    // sx={{ width: 250 }}
     role="presentation" className='categoryPanel px-3'
    //  onClick={()=>props.openCategoryPanel(false)}
     >
      <img src="/logo.jpg" alt="" className='w-[50%] p-3  ' />
        <h3 className='p-3 text-[16px] font-[500] flex items-center justify-between'>
            Shop By Categories
             <IoCloseSharp onClick={()=>props.openCategoryPanel(false)} className='cursor-pointer text-[20px]' />
                 </h3>

                {
                  categories.length!==0 &&   <CategoryCollapse openCategoryPanel={props.openCategoryPanel} />
                }
                <div className='p-3'>

                {
                  authContext.isLogin===false && context.windowWidth<992 && <Button onClick={()=>{
                    props.openCategoryPanel(false)
                    navigate('/login')
                  }} className='btn-org w-full'>Login</Button>
                }
                {
                  authContext.isLogin===true && context.windowWidth<992 && <Button onClick={()=>{
                    props.openCategoryPanel(false)
                    authContext.logout()
                    navigate('/')
                  }} className='btn-org w-full'>Logout</Button>
                }
                </div>
                
                 
   
  
    </Box>
  );


  return (
   <>
      <Drawer open={props.isOpenCategoryPanel} onClose={()=>props.openCategoryPanel(false)}>
        {DrawerList}
      </Drawer>
   </>
  )
}

export default CategoryPanel
