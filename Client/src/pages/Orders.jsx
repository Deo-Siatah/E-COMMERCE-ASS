import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/order"; 
import { toast } from "sonner";
import { 
  Package, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Car,
  Calendar,
  CreditCard
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token"); // Or however you retrieve your auth token

useEffect(() => {
  const fetchOrders = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await getMyOrders(token);
      
      // FIX: Check if the response itself is the array, 
      // or if the array is inside a property called 'orders' or 'data'
      const actualOrders = Array.isArray(response) 
        ? response 
        : (response.orders || response.data || []);
      
      setOrders(actualOrders);
    } catch (error) {
      toast.error("Could not load your order history.");
      setOrders([]); 
    } finally {
      setIsLoading(false);
    }
  };

  fetchOrders();
}, [token]);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-zinc-950 dark:text-white tracking-tighter">
            Purchase <span className="text-emerald-600">History</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
            Manage and track your vehicle acquisitions.
          </p>
        </div>

        {!token || orders.length === 0 ? (
          /* Graceful Empty State */
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mb-8 font-medium">
              It looks like you haven't made any purchases yet. Your dream car is waiting in our showroom.
            </p>
            <Link 
              to="/cars" 
              className="inline-flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-lg"
            >
              Browse Showroom <ChevronRight size={16} />
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id} 
                className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-900/5 transition-all duration-300"
              >
                <div className="p-6 md:p-8">
                  {/* Order Top Meta */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                        <Calendar size={20} className="text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Order Placed</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                      {order.status || "Processing"}
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                    {/* Item Preview */}
                    <div className="lg:col-span-3 flex items-center gap-6">
                      <div className="w-24 h-20 md:w-32 md:h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0">
                        {/* Assuming your order object has a car/item reference */}
                        <img 
                          src={order.items?.[0]?.image || "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400"} 
                          alt="Ordered Vehicle"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                          {order.items?.[0]?.make} {order.items?.[0]?.model}
                        </h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 font-bold uppercase tracking-wider">
                          ID: #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="text-left lg:text-right border-t lg:border-t-0 pt-6 lg:pt-0 border-zinc-100 dark:border-zinc-800">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1">Total Amount</p>
                      <p className="text-2xl font-black text-emerald-600 dark:text-emerald-500 tracking-tighter">
                        Ksh {order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Footer Action */}
                <div className="bg-zinc-50/50 dark:bg-zinc-800/30 px-8 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-zinc-400">
                      <CreditCard size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Paid via M-Pesa / Bank</span>
                   </div>
                   <Link to={`/orders/${order._id}`} className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                      Details <ChevronRight size={14} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;