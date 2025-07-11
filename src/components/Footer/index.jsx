import { LiaShippingFastSolid } from "react-icons/lia"
import { PiKeyReturn } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "@mui/material";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'


import { FaFacebookF } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <>
    <footer className="py-6 bg-[#fafafa]">
        <div className="container">
            <div className="flex items-center justify-center gap-2 py-8 ">
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <LiaShippingFastSolid className="text-[40px] group-hover:text-primary
                     transition-all ease-in-out duration-300 group-hover:-translate-y-1 "/>
                    <h3 className="text-[16px] font-[600] mt-3">Free Shipping</h3>
                    <p className="text-[12px] font-[500]">For all Order above ₹249</p>

                </div>
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <PiKeyReturn className="text-[40px] group-hover:text-primary
                     transition-all ease-in-out duration-300 group-hover:-translate-y-1 "/>
                    <h3 className="text-[16px] font-[600] mt-3">30 Days Return</h3>
                    <p className="text-[12px] font-[500]">For an Exchange Product</p>

                </div>
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <BsWallet2 className="text-[40px] group-hover:text-primary
                     transition-all ease-in-out duration-300 group-hover:-translate-y-1 "/>
                    <h3 className="text-[16px] font-[600] mt-3">Secure Payment</h3>
                    <p className="text-[12px] font-[500]">Payment Card Accepted</p>

                </div>
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <LiaGiftSolid className="text-[40px] group-hover:text-primary
                     transition-all ease-in-out duration-300 group-hover:-translate-y-1 "/>
                    <h3 className="text-[16px] font-[600] mt-3">Special Gifts</h3>
                    <p className="text-[12px] font-[500]">Our First Product Order</p>

                </div>
                <div className="col flex items-center justify-center flex-col group w-[15%]">
                    <RiCustomerService2Line className="text-[40px] group-hover:text-primary
                     transition-all ease-in-out duration-300 group-hover:-translate-y-1 "/>
                    <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
                    <p className="text-[12px] font-[500]">Contact us Anytime</p>

                </div>
           
            </div>
            <br />
  <hr />
  <div className="footer flex  py-12 ">
    <div className="section1 w-[25%] border-r-1 border-[rgba(0,0,0,.1)]">
        <h2 className="text-[18px] font-[600] mb-4 ">Contact Us</h2>
        <p className="text-[13px] font-[400] pb-4">Classyshop - Mega Super Store <br />
507-Union Trade Centre Frances Road , Kerala
</p>
<Link className='link text-[13px]' to='mailto:some@example.com' >sales@yourCompany.com</Link>
<span className="text-[22px] font-[600] block w-full mt-3 text-primary mb-5"> (+91) 9876-543-210</span>
<div className="flex items-center gap-2">
    <IoChatboxOutline className="text-[40px] text-primary"/>
    <span className="text-[16px] font-[600] pl-5 ">Online Chat <br /> Get Expert Help</span>

</div>
    </div>
    <div className="section2 w-[40%] flex pl-8 ">
        <div className="section2-col1 flex flex-col justify-start w-[50%]">
            <h2 className="text-[18px] font-[600] mb-4">Products</h2>
            <ul className="list">
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Price drop
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     New Products
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Best Sales
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Contact Us
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Sitemap
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Stores
                    </Link>
                </li>
               
            </ul>
        </div>
        <div className="section2-col2 flex flex-col justify-start w-[50%]">
            <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
            <ul className="list">
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Delivery
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Legal Notice
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Terms And Conditions of Use
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     About Us
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Secure Payment
                    </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-2">
                    <Link to='/' className="link">
                     Login
                    </Link>
                </li>
               
            </ul>
        </div>

    </div>
    <div className="section3 w-[35%] flex pl-8 flex-col pr-8">
        <h2 className="text-[18px] font-[600] mb-4">Subscribe to our newsletter</h2>
        <p className="text-[13px] ">Subscribe to our newsletter to get the latest news and offers .</p>
        <form className="mt-5">
            <input type="text" className="w-full h-[45px] outline-none border-1 border-[rgba(0,0,0,0.2)]  pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.8)] "placeholder="Your Email Address" />
            <Button className="btn-org">
                SUBSCRIBE

            </Button>
                  <FormControlLabel required control={<Checkbox />} label="I agree the terms and conditions and the privacy policy" />


        </form>
    </div>

  </div>
        </div>
    </footer>

    <div className="bottomStrip border-t-1  border-t-[rgba(204,175,175,0.8)] py-3 bg-white">
        <div className="container flex items-center justify-between" >
            <ul className="flex items-center gap-2">
                <li className="list-none">
                    <Link to='/' target="_blank" className="
                    w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-primary transition-colors duration-300 ease-in-out
                    group
                    ">
                    <FaFacebookF className="text-[15px]  group-hover:text-white"/>
                    </Link>
                </li>
                <li className="list-none">
                    <Link to='/' target="_blank" className="
                    w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-primary transition-colors duration-300 ease-in-out
                    group
                    ">
                    <RiYoutubeLine className="text-[15px]  group-hover:text-white"/>
                    </Link>
                </li>
                <li className="list-none">
                    <Link to='/' target="_blank" className="
                    w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-primary transition-colors duration-300 ease-in-out
                    group
                    ">
                    <FaPinterestP className="text-[15px]  group-hover:text-white"/>
                    </Link>
                </li>
                <li className="list-none">
                    <Link to='/' target="_blank" className="
                    w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-primary transition-colors duration-300 ease-in-out
                    group
                    ">
                    <FaInstagram className="text-[15px]  group-hover:text-white"/>
                    </Link>
                </li>
            </ul>

       <p className="text-[13px] text-center mb-0">Copyright © 2025. All Rights Reserved</p>
       <div className="flex items-center">
        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752246118/carte_bleue_abx9gx.png" alt="carte bleue card" />
        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752246118/visa_krt4cu.png" alt="visa card" />
        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752246118/master_card_cm3vzm.png" alt="master card" />
        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752246118/paypal_sxure4.png" alt="paypal" />
        <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752246118/american_express_rmnizr.png" alt="american express card" />
       </div>
        </div>
    </div>

    </>

  )
}

export default Footer