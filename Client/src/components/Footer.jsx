import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin,   
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 px-6 lg:px-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                MARA<span className="text-emerald-500">DEALERS</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-medium">
              Redefining the automotive experience in Narok. Premium vehicles, 
              transparent history, and unmatched client service.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/maradealers" className="hover:text-emerald-500 transition-colors">
                <MapPin size={20} />
              </a>
              <a href="https://instagram.com/_maradeale" className="hover:text-emerald-500 transition-colors">
                <MapPin size={20} />
              </a>
              <a href="https://x.com/maradealers" className="hover:text-emerald-500 transition-colors">
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Inventory</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/cars" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">All Vehicles <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
              <li><Link to="/cars?condition=new" className="hover:text-emerald-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/cars?condition=used" className="hover:text-emerald-400 transition-colors">Certified Pre-Owned</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Sell Your Vehicle</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Visit Our Showroom</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-emerald-500 shrink-0" size={20} />
                  <span className="text-sm leading-snug">
                    Opposite Oltalet Mall,<br />
                    Narok, Kenya
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-emerald-500 shrink-0" size={20} />
                  <a href="tel:+254768659047" className="text-sm hover:text-white transition-colors">
                    +254 768 659 047
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-emerald-500 shrink-0" size={20} />
                  <a href="mailto:maradealers.info.com" className="text-sm hover:text-white transition-colors">
                    maradealers.info.com
                  </a>
                </div>
                <div className="pt-2">
                  <div className="inline-block px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">Business Hours</p>
                    <p className="text-xs text-zinc-300 font-bold">Mon — Sat: 8AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium">
            &copy; {currentYear} Mara Dealers Limited. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-tighter">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;