"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaCheck, FaBox, FaMapPin, FaPhone } from "react-icons/fa"

const statuses = ["pending", "confirmed", "shipped", "on-the-way", "delivered"]

function OrderTracking() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/order/${orderId}`).then((res) => {
      setOrder(res.data.order)
      setLoading(false)
    })
  }, [orderId])

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (!order) return <div className="p-6 text-center">Order not found.</div>

  const currentStep = statuses.findIndex(
    (s) =>
      order?.order_status && s.toLowerCase().replace(/\s/g, "") === order.order_status.toLowerCase().replace(/\s/g, ""),
  )

  const isCancelled = order.order_status === "cancelled"

  return (
    <div className={`min-h-screen bg-background ${isCancelled ? "opacity-80" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* left section  */}
          <div className="lg:col-span-1">
            {isCancelled ? (
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-lg font-bold text-primary">Order Cancelled</div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Order Status</h3>

                <div className="relative space-y-6">
                  {statuses.map((status, index) => {
                    const isCompleted = index <= currentStep
                    const isLast = index === statuses.length - 1

                    return (
                      <div key={status} className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all
                              ${
                                isCompleted
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-border bg-background text-muted-foreground"
                              }`}
                          >
                            {isCompleted && <FaCheck size={12} />}
                          </div>

                          {/* Vertical line */}
                          {!isLast && (
                            <div
                              className={`w-0.5 h-12 mt-2 transition-colors ${
                                isCompleted ? "bg-primary" : "bg-border"
                              }`}
                            />
                          )}
                        </div>

                        {/* Status label */}
                        <div className="pt-1">
                          <p
                            className={`font-medium capitalize text-sm transition-colors ${
                              index === currentStep
                                ? "text-primary font-semibold"
                                : isCompleted
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {status}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Order Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Order ID */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Order ID</p>
                  <p className="font-mono text-sm font-medium text-foreground">{order._id}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Status</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                    {order.order_status}
                  </span>
                </div>

                {/* Payment Method */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Payment Method</p>
                  <p className="text-sm text-foreground">
                    {order.payment_method}{" "}
                    <span className="text-muted-foreground">({order.payment_status || "pending"})</span>
                  </p>
                </div>

                {/* Total Amount */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{order.total}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaMapPin className="text-primary" size={18} />
                <h4 className="font-semibold text-foreground">Delivery Address</h4>
              </div>

              <div className="space-y-2 ml-6">
                <p className="text-sm text-foreground font-medium">{order.delivery_address.address_line}</p>
                <p className="text-sm text-muted-foreground">
                  {order.delivery_address.city}, {order.delivery_address.state}, {order.delivery_address.country} -{" "}
                  {order.delivery_address.pincode}
                </p>
                <p className="text-sm text-foreground flex items-center gap-2 pt-2">
                  <FaPhone className="text-primary" size={14} />
                  {order.delivery_address.mobile}
                </p>
              </div>
            </div>

            {/* Products Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBox className="text-primary" size={18} />
                <h4 className="font-semibold text-foreground">Products</h4>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto px-3 no-scrollbar ">
                {order.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-start gap-4 pb-3 border-b border-border last:border-b-0"
                  >
                    {/* Product Image */}
                    <img
                      src={product.image[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {product.quantity} × ₹{product.price}
                      </p>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-sm text-primary">₹{product.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
