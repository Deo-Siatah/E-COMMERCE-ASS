import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, removeFromCart, clearCart } from "../api/cart";
import { toast } from "sonner";
import { 
  Loader2, Trash2, ShoppingBag, ArrowRight, 
  ShieldCheck, CreditCard, ShoppingCart, CheckCircle2, PartyPopper 
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success page

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await getCart(token);
      setCartItems(data.items || data.cars || []); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your garage.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (carId) => {
    try {
      await removeFromCart(carId, token);
      setCartItems((prev) => prev.filter((item) => item.car._id !== carId));
      toast.success("Vehicle removed from your garage.");
    } catch (error) {
      toast.error("Failed to remove vehicle.");
    }
  };

  // Modified to allow silent clearing after checkout
  const handleClearCart = async (showConfirm = true) => {
    if (showConfirm && !window.confirm("Are you sure you want to clear your garage?")) return;
    try {
      await clearCart(token);
      setCartItems([]);
      if (showConfirm) toast.success("Garage cleared.");
    } catch (error) {
      toast.error("Failed to clear garage.");
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true); // Show success screen
      handleClearCart(false); // Clear cart silently
      toast.success("Reservation Secured!");
    }, 2000);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.car?.price || 0), 0);
  const reservationFee = cartItems.length > 0 ? 2300000 : 0;

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  // 2. Auth State
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950 pt-24">
        <ShoppingBag size={64} className="text-gray-300 dark:text-gray-700 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please log in to view your Garage</h2>
        <Link to="/login" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-500 transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  // 3. Success Page State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-32 pb-20 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-[3rem] border border-emerald-100 dark:border-emerald-900/30 p-12 text-center shadow-2xl shadow-emerald-500/10">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your reservation is confirmed. We've sent a receipt to your email, and a dealer representative will call you within 24 hours to finalize the paperwork.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-6 mb-10 flex items-center gap-4 text-left">
            <PartyPopper className="text-emerald-600" size={32} />
            <div>
              <p className="font-bold text-emerald-900 dark:text-emerald-100">Order ID: #REV-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">The vehicles have been moved to your "Reserved" list.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 transition-all hover:scale-105">
              Continue Shopping
            </Link>
            <Link to="/profile" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Main Cart View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <ShoppingCart size={40} className="text-emerald-500" /> Your Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              You have {cartItems.length} vehicle(s) saved for reservation.
            </p>
          </div>
          {cartItems.length > 0 && (
            <button 
              onClick={() => handleClearCart(true)}
              className="text-red-500 hover:text-red-600 font-semibold text-sm transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingCart size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any vehicles yet. Explore our showroom to find your dream car.
            </p>
            <Link to="/cars" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20">
              Browse Showroom <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const car = item.car;
                if (!car) return null;
                
                return (
                  <div key={car._id} className="bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-6 items-center relative overflow-hidden group">
                    <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      <img 
                        src={car.images?.[0] || "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"} 
                        alt={car.model}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{car.condition} • {car.mileage?.toLocaleString()} mi</p>
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        Ksh {car.price?.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex sm:flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                      <Link 
                        to={`/cars/${car._id}`}
                        className="flex-1 sm:flex-none text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                      >
                        View
                      </Link>
                      <button 
                        onClick={() => handleRemove(car._id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-6 py-3 rounded-xl font-semibold transition-colors"
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  Reservation Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Vehicle Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Ksh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Reservation Deposit</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Ksh {reservationFee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 dark:text-white font-bold">Total Due Today</span>
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                      Ksh {reservationFee.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-right">Fully refundable for 48 hours.</p>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-70"
                >
                  {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <><CreditCard size={20} /> Secure Reservation</>}
                </button>

                <div className="mt-6 flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
                  <ShieldCheck className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                  {/* <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                    Your payments are secured with 256-bit encryption. The dealer will contact you to finalize the remaining balance.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;