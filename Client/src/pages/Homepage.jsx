import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLatestCars } from "../api/cars"; 
import { toast } from "sonner";
import { Loader2, ArrowRight, Fuel, Settings2, Gauge, ShieldCheck } from "lucide-react";

const fallbackImages = [
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800", 
  "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800", 
  "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800"  
];

const Home = () => {
  const [latestCars, setLatestCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getLatestCars();
        setLatestCars(data);
      } catch (error) {
        toast.error(error || "Failed to load latest inventory.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* 1. Modern Hero Section with Subtle Glow */}
      {/* 1. Modern Hero Section with Mercedes Background & Ambient Optics */}
<section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-24 pb-32 px-6 lg:px-8 border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
  
  {/* Background Image Layer: Mercedes-Benz from Pexels */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <img 
      src="https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=1600" 
      alt="Mercedes-Benz Dealer" 
      className="w-full h-full object-cover object-center opacity-20 dark:opacity-20 transition-opacity duration-300"
    />
    {/* Subtle Gradient Overlay to blend the image into the background color */}
    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
  </div>

  {/* Background Ambient Glow */}
  <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full overflow-hidden -z-10 pointer-events-none">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 dark:opacity-20 bg-gradient-to-b from-emerald-500/30 to-transparent blur-3xl rounded-full"></div>
  </div>

  {/* Content (Stayed identical in wording) */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
      <ShieldCheck size={16} /> Trusted by 10,000+ drivers
    </div>
    
    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">
      Find Your Dream Car with <br className="hidden md:block" />
      <span className="text-emerald-500">Mara Dealers</span>
    </h1>
    
    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
      Discover premium used and new vehicles. We offer transparent pricing, verified sellers, and an effortless checkout experience tailored for you.
    </p>
    
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link to="/cars" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
        Browse Inventory <ArrowRight size={20} />
      </Link>
      <Link to="/services" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center">
        Sell Your Car
      </Link>
    </div>
  </div>
</section>

      {/* 2. Latest Arrivals Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Latest Arrivals</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">Fresh inventory just added to our showroom.</p>
          </div>
          <Link to="/cars" className="text-emerald-600 dark:text-emerald-500 font-semibold hover:text-emerald-700 dark:hover:text-emerald-400 transition flex items-center gap-1">
            View full catalog <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-emerald-500" size={48} />
          </div>
        ) : latestCars.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No cars available right now. Check back soon!</p>
          </div>
        ) : (
          
          /* Polished Car Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCars.map((car, index) => (
              <div key={car._id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-300 group flex flex-col">
                
                {/* Image Container with Badges */}
                <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <span className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                    {car.condition}
                  </span>
                  <img 
                    src={car.images && car.images.length > 0 ? car.images[0] : fallbackImages[index % 3]} 
                    alt={`${car.make} ${car.model}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {car.year} {car.make} {car.model}
                    </h3>
                  </div>
                  
                  <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-6">
                    Ksh{car.price.toLocaleString()}
                  </p>

                  {/* Icon Specs Row */}
                  <div className="grid grid-cols-3 gap-4 mb-8 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-1.5">
                      <Fuel size={18} className="text-gray-400" />
                      <span className="truncate">{car.fuelType}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 border-x border-gray-100 dark:border-gray-800">
                      <Settings2 size={18} className="text-gray-400" />
                      <span className="truncate">{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <Gauge size={18} className="text-gray-400" />
                      <span className="truncate">{car.mileage?.toLocaleString() || "0"} mi</span>
                    </div>
                  </div>

                  {/* Action Button pushes to the bottom */}
                  <div className="mt-auto">
                    <Link to={`/cars/${car._id}`} className="block w-full text-center bg-gray-50 dark:bg-gray-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 text-gray-900 dark:text-gray-100 font-semibold py-3 rounded-xl transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;