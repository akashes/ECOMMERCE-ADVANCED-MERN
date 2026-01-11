import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Home, Package } from "lucide-react"
import { useLocation } from "react-router-dom"
import { Clickable } from "../../utils/Clickable"
const OrderSuccess = () => {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)
  const location = useLocation()


const { orderId, amount, paymentMethod } = location.state || {}

console.log(location.state)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  useEffect(()=>{
    if(!location.state){
        navigate('/');
        return;
    }
    setIsAnimating(true)

  },[location.state,navigate])

  if(!location.state) return null;

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div
          className={`flex justify-center mb-8 transition-all duration-1000 ${isAnimating ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
        >
          <div className="relative">
            {/* Outer Ring */}
            <div
              className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"
              style={{ width: "120px", height: "120px" }}
            />

            {/* Check Icon Container */}
            <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-primary/30">
              <Check className="w-14 h-14 text-primary-foreground stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className={`text-center mb-8 transition-all duration-1000 delay-200 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-base text-muted-foreground mb-4">Thank you for your purchase</p>
          <div className="h-1 w-12 bg-primary rounded-full mx-auto" />
        </div>

        {/* Order Details Card */}
        <div
          className={`bg-card border border-border rounded-2xl p-6 mb-6 transition-all duration-1000 delay-300 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
                <div className="flex gap-4">

              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-semibold text-foreground">
                #{`${orderId}`}
              </p>
                </div>
                <div className="flex gap-4">

              <p className="text-sm text-muted-foreground mb-1">Total </p>
              <p className="font-semibold text-foreground">
                {`₹${amount}`}
              </p>
                </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
            <p className="font-semibold text-foreground">3-5 Business Days</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex gap-3 justify-around transition-all duration-1000 delay-400 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >

            <Clickable>
          <button
            onClick={() => navigate("/my-orders", { replace: true })}
            className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2"
            >
            <Package className="w-4 h-4" />
            View Orders
          </button>
          </Clickable>
          <Clickable>

          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex-1 shadow-md px-10 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors duration-200 flex items-center justify-center gap-2"
            >
            <Home className="w-4 h-4" />
            Home
          </button>
            </Clickable>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">A confirmation email has been sent to your inbox</p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default OrderSuccess
