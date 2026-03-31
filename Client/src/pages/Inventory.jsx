import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../api/cars";
import { toast } from "sonner";
import { 
  Loader2, Search, Fuel, Settings2, Gauge, 
  ChevronLeft, ChevronRight, SlidersHorizontal, X 
} from "lucide-react";

const Inventory = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  
  // Filter State
  const [filters, setFilters] = useState({
    make: "",
    condition: "",
    year: "",
  });

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await getAllCars({ 
        ...filters, 
        page: pagination.current,
        limit: 6 // Show 6 per page
      });
      setCars(data.cars);
      setPagination({ current: data.currentPage, total: data.totalPages });
    } catch (error) {
      toast.error("Could not load inventory");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when filters or page changes
  useEffect(() => {
    fetchInventory();
  }, [pagination.current, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to page 1 on new filter
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Our Showroom</h1>
          <p className="text-gray-500 dark:text-gray-400">Explore our premium collection of {cars.length} available vehicles.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 mb-12 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Search Make</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                name="make"
                placeholder="e.g. Mercedes"
                value={filters.make}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white shadow-sm"
              />
            </div>
          </div>

          <div className="w-full md:w-48">
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Condition</label>
            <select 
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white shadow-sm"
            >
              <option value="">All Conditions</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <button 
            onClick={() => setFilters({ make: "", condition: "", year: "" })}
            className="p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-red-500 transition-colors shadow-sm"
            title="Clear Filters"
          >
            <X size={24} />
          </button>
        </div>

        {/* Results Area */}
        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>
        ) : cars.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-gray-800">
            <span className="text-6xl block mb-4">🙊</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Oops! Car not currently available</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <>
            {/* Grid - Using your exact Homepage Card Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cars.map((car) => (
                <div key={car._id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-300 group flex flex-col">
                  <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <span className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                      {car.condition}
                    </span>
                    <img 
                      src={car.images[0] || "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"} 
                      alt={car.model} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-6">
                      Ksh{car.price.toLocaleString()}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-1.5">
                        <Fuel size={18} className="text-gray-400" />
                        <span className="truncate">{car.fuelType}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 border-x border-gray-100 dark:border-gray-800">
                        <Settings2 size={18} className="text-gray-400" />
                        <span className="truncate text-[10px]">{car.transmission}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5">
                        <Gauge size={18} className="text-gray-400" />
                        <span className="truncate">{car.mileage?.toLocaleString()} mi</span>
                      </div>
                    </div>

                    <Link to={`/cars/${car._id}`} className="mt-auto block w-full text-center bg-gray-50 dark:bg-gray-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 text-gray-900 dark:text-gray-100 font-semibold py-3 rounded-xl transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.total > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button 
                  disabled={pagination.current === 1}
                  onClick={() => setPagination(p => ({ ...p, current: p.current - 1 }))}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-30 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <span className="font-bold text-gray-900 dark:text-white">
                  Page {pagination.current} of {pagination.total}
                </span>

                <button 
                  disabled={pagination.current === pagination.total}
                  onClick={() => setPagination(p => ({ ...p, current: p.current + 1 }))}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 disabled:opacity-30 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Inventory;