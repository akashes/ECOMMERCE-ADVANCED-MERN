import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AccountSidebar from "../../components/AccountSidebar";
import MyListItems from "./MyListItems";
import { AuthContext } from "../../contexts/AuthContext";
import { getWishlistItems, setWishlistReducer } from "../../features/wishList/wishListSlice";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const MyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const context = useContext(AuthContext);

  const { wishlist } = useSelector((state) => state.wishlist);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [localWishlist, setLocalWishlist] = useState([]);
  const[confirm,setConfirm]=useState(true)

  useEffect(() => {
    const run = async () => {
      if (!context.user) {
        dispatch(getWishlistItems(null));
        return;
      }

      const local = JSON.parse(localStorage.getItem("wishlist")) || [];
      setLocalWishlist(local);

      if (local.length === 0) {
        dispatch(getWishlistItems(context.user));
      } else {
        confirm && 
        setConfirmOpen(true); //  show custom confirm dialog
      }
    };
    run();
  }, [context.user, dispatch]);

  const handleConfirm = async () => {
    try {
      const { data } = await axios.post("/api/myList/merge", { productIds: localWishlist });
      dispatch(setWishlistReducer(data.items));
      localStorage.removeItem("wishlist");
    } catch (err) {
      console.error("Merge failed", err);
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleCancel = () => {
    dispatch(getWishlistItems(context.user));
    localStorage.removeItem("wishlist");
    setConfirmOpen(false);
  };

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
  
  
    },[])

  return (
    <section className= "py-4 lg:py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">
        <div className="col1 w-full md:w-[20%] hidden lg:block">
          <AccountSidebar />
        </div>
        <div className="col2 w-full md:w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My Wishlist</h2>
              {
                wishlist?.length>0 ?      <p>
                There are{" "}
                <span className="font-bold text-primary">{wishlist?.length}</span> products in your
                List
              </p>:
              <p className="font-[500]">Your Wishlist is currently Empty</p>
              }
         
            </div>
            {wishlist?.length > 0 ?
              wishlist.map((item) => <MyListItems key={item._id} item={item} />) : 
              <div className="flex justify-center items-center flex-col py-10 px-3 gap-3">
                <img className="  h-[150px]" src="https://res.cloudinary.com/dllelmzim/image/upload/v1756095516/wishlist_ptugf5.png" alt="" />
                <h3>Wishlist is currently empty</h3>
                                    <Button onClick={()=>{ navigate('/products')}} className="btn-org btn-sm">Continue Shopping</Button>
                
              </div>}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Merge Wishlists?"
        message="We found items in your guest wishlist. Do you want to merge them with your account wishlist?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default MyList;
