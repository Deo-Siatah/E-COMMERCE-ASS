import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, ShoppingCart, User, Menu, X, Moon, Sun, ClipboardList, Wrench } from "lucide-react";

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Car size={18} /> },
    { name: "Showroom", path: "/cars", icon: <Car size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Orders", path: "/orders", icon: <ClipboardList size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Services", path: "/manage", icon: <Wrench size={18} /> },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-600 dark:text-emerald-500">
            <Car className="text-emerald-500" />
            Mara<span className="text-gray-900 dark:text-white">Cars</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="flex items-center gap-1 text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400 font-medium transition">
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-gray-800 dark:hover:text-emerald-400">
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;