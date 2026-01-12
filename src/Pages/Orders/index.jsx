"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cancelOrder, getOrders } from "../../features/order/orderSlice"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogActions, DialogContent, Typography, Box, Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import { CiWarning } from "react-icons/ci"
import { FaChevronDown, FaEye } from "react-icons/fa"
import AccountSidebar from "../../components/AccountSidebar"
import { showError, showSuccess } from "../../utils/toastUtils"
import OrdersSkeleton from "../../components/Skeltons/OrdersSkelton"

const DarkDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#1e293b",
    color: "#fff",
    borderRadius: "12px",
    padding: theme.spacing(1),
    minWidth: 400,
  },
}))

function WarningDialog({ open, handleClose, targetFn }) {
  return (
    <DarkDialog open={open} onClose={handleClose}>
      <DialogContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: "50%",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CiWarning size={28} color="#f87171" />
        </Box>
        <Box>
          <Typography className="text-white" variant="h6" sx={{ fontWeight: 600 }}>
            Cancel this Order?
          </Typography>
          <Typography className="!text-gray-400" variant="body2" sx={{ color: "#cbd5e1", mt: 1 }}>
            This action cannot be undone
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#334155",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#475569" },
          }}
          onClick={handleClose}
        >
          Leave
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ef4444",
            color: "#fff",
            textTransform: "none",
            "&:hover": { backgroundColor: "#dc2626" },
          }}
          onClick={() => {
            targetFn()
            handleClose()
          }}
          autoFocus
        >
          Cancel Order
        </Button>
      </DialogActions>
    </DarkDialog>
  )
}

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    "on-the-way": "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    "cancel-requested": "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusLabels = {
    pending: "Pending",
    confirmed: "Confirmed",
    shipped: "Shipped",
    "on-the-way": "On the Way",
    delivered: "Delivered",
    "cancel-requested": "Cancel Requested",
    cancelled: "Cancelled",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}
    >
      {statusLabels[status] || status}
    </span>
  )
}

const ProductRow = ({ product }) => (
  <div className="flex items-center gap-4 py-3 px-4 border-b border-gray-200 hover:bg-gray-50">
    <img
      src={product.image[0] || "/placeholder.svg"}
      alt={product.name}
      className="w-12 h-12 object-cover rounded-lg"
    />
    <div className="flex-1 min-w-0">
      <p className="font-medium text-gray-900 truncate">{product.name}</p>
      <p className="text-sm text-gray-500">ID: {product.productId}</p>
    </div>
    <div className="flex items-center gap-8">
      <div className="text-right">
        <p className="text-sm text-gray-500">Qty</p>
        <p className="font-semibold text-gray-900">{product.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Price</p>
        <p className="font-semibold text-gray-900">
          {product.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Subtotal</p>
        <p className="font-semibold text-primary">
          {product.subtotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
        </p>
      </div>
    </div>
  </div>
)

const OrderCard = ({ order, index, showProducts, onToggleProducts, onViewDetails, onCancelOrder, cancelledOrder }) => {
  const isExpanded = showProducts === index

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden transition-all ${cancelledOrder ? "opacity-50" : ""}`}
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-gray-900">Order {order._id.slice(-8).toUpperCase()}</h3>
              <StatusBadge status={order.order_status} />
            </div>
            <p className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-primary">
              {order.total.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
            </p>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleProducts(index)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <span>{isExpanded ? "Hide" : "Show"} Items</span>
            <FaChevronDown size={12} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={onViewDetails}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary hover:opacity-90 rounded-lg transition-opacity"
          >
            <FaEye size={12} />
            View Details
          </button>
          {order.payment_method === "cod" && order.order_status !== "delivered" && !cancelledOrder && (
            <button
              onClick={onCancelOrder}
              className="ml-auto px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Card Body - Order Info */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-1">Customer</p>
            <p className="font-medium text-gray-900">{order.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Email</p>
            <p className="font-medium text-gray-900 truncate">{order.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Phone</p>
            <p className="font-medium text-gray-900">{order.delivery_address?.mobile}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Payment</p>
            <p className="font-medium text-gray-900">{order.payment_id ? order.payment_id.slice(-8) : "COD"}</p>
          </div>
        </div>
      </div>

      {/* Expandable Products Section */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
            {order.products?.length > 0 ? (
              <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                {order.products.map((product) => (
                  <ProductRow key={product.productId} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No products found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Orders = () => {
  const [showProducts, setShowProducts] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders, cancelledOrders, loading } = useSelector((state) => state.order)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const handleCancelOrder = async (orderId) => {
    try {
      const resultAction = await dispatch(cancelOrder(orderId))
      if (cancelOrder.fulfilled.match(resultAction)) {
        showSuccess(resultAction.payload.message || "Order Cancelled Successfully")
      }
      if (cancelOrder.rejected.match(resultAction)) {
        showError(resultAction.payload.message || "Failed to cancel Order")
      }
    } catch (error) {
      showError(error.response?.data?.message || error.message)
    }
  }

  const handleOpen = (id) => {
    setSelectedOrderId(id)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedOrderId(null)
  }

  const handleViewDetails = (orderId) => {
    navigate(`/order/${orderId}`)
  }

  return (
    <section className="py-5 lg:py-10 w-full bg-gray-50 min-h-screen">
      <WarningDialog open={open} handleClose={handleClose} targetFn={() => handleCancelOrder(selectedOrderId)} />

      <div className="container flex gap-5">
        <div className="col1 w-[20%] hidden lg:block">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[80%]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">
              You have <span className="font-semibold text-primary">{orders?.length || 0}</span>{" "}
              {orders?.length === 1 ? "order" : "orders"}
            </p>
          </div>

          {/* Orders List */}
          {loading ? (
            <OrdersSkeleton />
          ) : orders?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-gray-200">
              <img
                width={60}
                height={60}
                src="https://res.cloudinary.com/dllelmzim/image/upload/v1759721089/no-order_2_g1jkqu.png"
                alt="No orders"
              />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                No orders found
              </Typography>
              <p className="text-gray-500 text-sm mt-1">Start shopping to place your first order</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const cancelledOrder = cancelledOrders.includes(order._id) || order.order_status === "cancelled"

                return (
                  <OrderCard
                    key={order._id}
                    order={order}
                    index={index}
                    showProducts={showProducts}
                    onToggleProducts={setShowProducts}
                    onViewDetails={() => handleViewDetails(order._id)}
                    onCancelOrder={() => handleOpen(order._id)}
                    cancelledOrder={cancelledOrder}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Orders
