"use client"

import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import AccountSidebar from "../../components/AccountSidebar"
import MyListItems from "./MyListItems"
import { AuthContext } from "../../contexts/AuthContext"
import { getWishlistItems, setWishlistReducer } from "../../features/wishList/wishListSlice"
import ConfirmDialog from "../../components/ConfirmDialog"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

const MyList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const { wishlist } = useSelector((state) => state.wishlist)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [localWishlist, setLocalWishlist] = useState([])
  const [confirm, setConfirm] = useState(true)

  useEffect(() => {
    const run = async () => {
      if (!context.user) {
        dispatch(getWishlistItems(null))
        return
      }

      const local = JSON.parse(localStorage.getItem("wishlist")) || []
      setLocalWishlist(local)

      if (local.length === 0) {
        dispatch(getWishlistItems(context.user))
      } else {
        confirm && setConfirmOpen(true) //  show custom confirm dialog
      }
    }
    run()
  }, [context.user, dispatch])

  const handleConfirm = async () => {
    try {
      const { data } = await axios.post("/api/myList/merge", { productIds: localWishlist })
      dispatch(setWishlistReducer(data.items))
      localStorage.removeItem("wishlist")
    } catch (err) {
      console.error("Merge failed", err)
    } finally {
      setConfirmOpen(false)
    }
  }

  const handleCancel = () => {
    dispatch(getWishlistItems(context.user))
    localStorage.removeItem("wishlist")
    setConfirmOpen(false)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <section className="py-8 lg:py-16 w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container flex flex-col md:flex-row gap-8">
        <div className="col1 w-full md:w-[20%] hidden lg:block">
          <AccountSidebar />
        </div>
        <div className="col2 w-full md:w-[80%]">
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-2">
              <h1 className="text-2xl lg:text-2xl font-light tracking-tight text-slate-600">Saved Items</h1>
              {wishlist?.length > 0 && (
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {wishlist?.length} {wishlist?.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            {wishlist?.length === 0 && <p className="text-slate-500 text-sm">Your wishlist is empty</p>}
          </div>

          {wishlist?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {wishlist.map((item) => (
                <MyListItems key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col py-10 px-4 gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <div className="text-center max-w-sm">
                <h3 className="text-lg font-medium text-slate-900 mb-2">No saved items yet</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Start building your wishlist by saving your favorite products
                </p>
              </div>
              <Button
                onClick={() => navigate("/products")}
                variant="contained"
                className="capitalize"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              >
                Explore Products
              </Button>
            </div>
          )}
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
  )
}

export default MyList
