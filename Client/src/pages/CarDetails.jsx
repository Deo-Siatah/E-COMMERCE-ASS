import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCarById } from "../api/cars";
import { toast } from "sonner";
import {addToCart} from "../api/cart"
import { 
  Loader2, Fuel, Settings2, Gauge, Calendar, 
  MapPin, User, MessageSquare, Phone, ChevronLeft,
  ShieldCheck,ShoppingCart, Zap, Info
} from "lucide-react";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        toast.error("Vehicle not found or connection error.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [id]);


  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  if (!car) return <div className="text-center py-20 dark:text-white">Car not found.</div>;

  const handleAddToCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please log in to add vehicles to your garage.");
    return;
  }
  try {
    await addToCart(car._id, token);
    toast.success(`${car.make} ${car.model} added to your Garage!`);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to garage. It might already be there.");
  }
};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors duration-300 pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Navigation & Title */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to Showroom
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Gallery & Specs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="relative h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <img 
                  src={car.images[activeImage] || "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"} 
                  className="w-full h-full object-cover"
                  alt={car.model}
                />
                {car.isSold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-5xl font-black rotate-[-10deg] border-8 border-white p-4">SOLD</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {car.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-emerald-500 scale-95' : 'border-transparent opacity-60'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Calendar />, label: "Year", value: car.year },
                { icon: <Fuel />, label: "Fuel", value: car.fuelType },
                { icon: <Settings2 />, label: "Trans", value: car.transmission },
                { icon: <Gauge />, label: "Mileage", value: `${car.mileage?.toLocaleString()} mi` }
              ].map((spec, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
                  <div className="text-emerald-500 flex justify-center mb-2">{spec.icon}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">{spec.label}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Description Section */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Info className="text-emerald-500" /> Vehicle Overview
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {car.description || "This premium vehicle has been meticulously inspected and is ready for its new owner. Contact the dealer for a full history report and test drive arrangements."}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Price & Owner (Sticky) */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Price Card */}
              <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-600/20">
                <h1 className="text-3xl font-black mb-1">{car.year} {car.make}</h1>
                <p className="text-xl font-bold opacity-80 mb-6">{car.model} • {car.condition}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">Ksh {car.price?.toLocaleString()}</span>
                </div>
              </div>

              {/* Owner/Contact Card */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Verified Seller</h3>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white">
                      {car.seller?.username || "Mara Official Dealer"}
                    </h4>
                    <p className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                      <ShieldCheck size={14} /> Certified Dealer
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                {/* Add to Cart Button */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={car.isSold}
                    className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg ${
                      car.isSold 
                        ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed shadow-none" 
                        : "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] shadow-emerald-500/30"
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {car.isSold ? "Vehicle Sold Out" : "Add to Cart"}
                  </button>
                  <a 
                    href={`tel:${car.seller?.phone || '0700000000'}`}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-950 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <Phone size={18} /> Call Dealer
                  </a>
                  <button 
                    onClick={() => toast.info("Chat feature coming soon!")}
                    className="w-full bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <MessageSquare size={18} /> Send Message
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs font-bold justify-center">
                  <MapPin size={14} /> Showroom: Nairobi, Kenya
                </div>
              </div>

              {/* Extra Trust Badge */}
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex gap-4 items-start">
                  <Zap className="text-emerald-500 mt-1" size={20} />
                  <div>
                    <p className="text-sm font-black text-emerald-900 dark:text-emerald-400 uppercase">Mara Fast-Track</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-500/80 font-medium leading-tight mt-1">
                      Secure this car with a fully refundable deposit. Valid for 48 hours.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;