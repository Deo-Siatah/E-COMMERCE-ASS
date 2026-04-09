import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLatestCars } from "../api/cars"; 
import { toast } from "sonner";
import { 
  Loader2, 
  ArrowRight, 
  Fuel, 
  Settings2, 
  Gauge, 
  ShieldCheck, 
  ChevronDown,
  Tag,
  Zap
} from "lucide-react";

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

  const featuredCars = latestCars.slice(0, 3);
  const moreCars = latestCars.slice(3);

  const renderCarCard = (car, index) => (
    <div key={car._id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-zinc-900/10 dark:shadow-none border border-zinc-200 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-emerald-500 transition-all duration-500 group flex flex-col">
      <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <span className="absolute top-4 left-4 z-10 bg-zinc-950/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-zinc-950 text-xs font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-xl">
          {car.condition}
        </span>
        <img 
          src={car.images && car.images.length > 0 ? car.images[0] : fallbackImages[index % 3]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
        />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black text-zinc-950 dark:text-white line-clamp-1 tracking-tight">
            {car.year} {car.make} {car.model}
          </h3>
        </div>
        
        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-8 tracking-tighter">
          Ksh {car.price.toLocaleString()}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          <div className="flex flex-col items-center gap-2">
            <Fuel size={20} className="text-zinc-400 dark:text-zinc-500" />
            <span className="truncate">{car.fuelType}</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-x border-zinc-100 dark:border-zinc-800">
            <Settings2 size={20} className="text-zinc-400 dark:text-zinc-500" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Gauge size={20} className="text-zinc-400 dark:text-zinc-500" />
            <span className="truncate">{car.mileage?.toLocaleString() || "0"} mi</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link to={`/cars/${car._id}`} className="block w-full text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-emerald-500 text-zinc-950 dark:text-zinc-100 font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-all duration-300">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      
      {/* 1. STYLISH, CLEAR HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        
        {/* Bright, Full-Color Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/31040127/pexels-photo-31040127.jpeg" 
            alt="Luxury Cars Showroom" 
            className="w-full h-full object-cover object-center"
          />
          {/* Very soft glass overlay: keeps it clear and bright, avoiding harsh blacks */}
          <div className="absolute inset-0  dark:bg-zinc-900/40 "></div>
          {/* Subtle bottom fade to blend into the rest of the page */}
          {/* <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div> */}
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center px-4 mt-12">
          {/* Using font-serif for a stylish, high-end fashion look */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-medium leading-tight text-white dark:text-white drop-shadow-2xl">
            MARA <span className="italic font-light text-emerald-600 dark:text-emerald-500">DEALERS</span>
          </h1>
          <p className="mt-6 text-sm md:text-base font-bold tracking-[0.3em] uppercase text-white dark:text-zinc-200 drop-shadow-md">
            The Pinnacle of Automotive Excellence
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-white dark:text-white" size={42} />
        </div>
      </section>

      {/* 2. Featured Inventory */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-white tracking-tighter">Featured Collection</h2>
          <Link to="/cars" className="hidden md:flex text-zinc-950 dark:text-white font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition items-center gap-2 uppercase tracking-wider text-sm">
            View Showroom <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
          </div>
        ) : featuredCars.length === 0 ? (
          <p className="text-zinc-500 text-center py-20 font-medium">Inventory is currently being updated.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => renderCarCard(car, index))}
          </div>
        )}
      </section>

      {/* 3. About Us / Learn More Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-32 px-6 border-y border-zinc-200 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-500 mb-8">
            Learn More About Us
          </h2>
          <p className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white leading-[1.2] tracking-tight">
            Discover premium used and new vehicles. We offer transparent pricing, verified sellers, and an effortless checkout experience tailored for you.
          </p>
        </div>
      </section>

      {/* 4. Why Choose Mara Dealers - Editorial List Layout */}
<section className="max-w-7xl mx-auto px-6 lg:px-8 py-32 border-t border-zinc-100 dark:border-zinc-900">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
    
    {/* Left Side: Large Sticky Heading */}
    <div className="lg:col-span-5 lg:sticky lg:top-32">
      <h2 className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 dark:text-emerald-500 mb-6">
        The Mara Advantage
      </h2>
      <h3 className="text-5xl md:text-6xl font-serif font-medium text-zinc-950 dark:text-white leading-tight">
        Why our clients <br /> 
        <span className="italic">choose Mara Dealers</span>
      </h3>
      <p className="mt-8 text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-sm leading-relaxed">
        We’ve stripped away the complexity of car buying to provide a service that is as premium as the vehicles we sell.
      </p>
    </div>

    {/* Right Side: Streamlined List (No Cards) */}
    <div className="lg:col-span-7 space-y-0">
      
      {/* Feature 01 */}
      <div className="group py-12 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row gap-8 items-start transition-all duration-500">
        <div className="text-5xl font-serif italic text-zinc-200 dark:text-zinc-800 group-hover:text-emerald-500 transition-colors duration-500">
          01
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Tag size={24} className="text-emerald-600 dark:text-emerald-500" />
            <h4 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">Transparent Pricing</h4>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
            No hidden fees, no last-minute surprises. The price you see is exactly what you pay, ensuring a smooth and honest financial experience.
          </p>
        </div>
      </div>

      {/* Feature 02 */}
      <div className="group py-12 border-b border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row gap-8 items-start transition-all duration-500">
        <div className="text-5xl font-serif italic text-zinc-200 dark:text-zinc-800 group-hover:text-emerald-500 transition-colors duration-500">
          02
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={24} className="text-emerald-600 dark:text-emerald-500" />
            <h4 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">Verified Sellers</h4>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
            Every vehicle comes from strictly vetted sources and undergoes comprehensive background and mechanical checks by our expert team.
          </p>
        </div>
      </div>

      {/* Feature 03 */}
      <div className="group py-12 flex flex-col md:flex-row gap-8 items-start transition-all duration-500">
        <div className="text-5xl font-serif italic text-zinc-200 dark:text-zinc-800 group-hover:text-emerald-500 transition-colors duration-500">
          03
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className="text-emerald-600 dark:text-emerald-500" />
            <h4 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">Effortless Checkout</h4>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
            Our streamlined purchasing process is designed around your convenience, removing the paperwork headache and putting you behind the wheel faster.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* 5. More Inventory Section */}
      {moreCars.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-950 dark:text-white tracking-tighter">More Inventory</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreCars.map((car, index) => renderCarCard(car, index))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/cars" className="inline-flex bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-xl font-black tracking-widest uppercase text-sm hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white transition-all shadow-xl hover:shadow-emerald-600/30 items-center gap-3">
              Explore All Vehicles <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;