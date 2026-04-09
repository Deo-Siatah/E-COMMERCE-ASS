import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Car, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  ClipboardList, 
  Wrench 
} from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Showroom", path: "/cars", icon: <Car size={18} /> },
    { name: "Services", path: "/manage", icon: <Wrench size={18} /> },
    { name: "Orders", path: "/orders", icon: <ClipboardList size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Spacious h-20 height for a professional feel */}
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Clean Serif Branding */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl md:text-3xl font-serif font-medium tracking-tighter text-zinc-950 dark:text-white">
              MARA <span className="italic font-light text-emerald-600 dark:text-emerald-500">DEALERS</span>
            </span>
          </Link>

          {/* Desktop Links - Minimalist Style */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.icon}
                </span>
                <span className="uppercase tracking-[0.2em] text-[11px] font-bold">
                  {link.name}
                </span>
              </Link>
            ))}
            
            {/* Theme Toggle - Minimalist Circle */}
            <button 
              onClick={toggleTheme} 
              className="ml-4 p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-zinc-600 dark:text-zinc-400">
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-zinc-950 dark:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown - Clean and Simple */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-4 text-zinc-800 dark:text-zinc-200"
            >
              <span className="text-emerald-600">{link.icon}</span>
              <span className="uppercase tracking-widest text-sm font-bold">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;