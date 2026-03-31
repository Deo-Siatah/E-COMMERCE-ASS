import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Loader2, ChevronLeft } from "lucide-react";

const Login = ({ setAuthToken }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ email, password });
      
      // 'data.token' is what we need to trigger the App.jsx useEffect
      // 'data.username' is used for the immediate toast
      if (data.token) {
        setAuthToken(data.token); 
        toast.success(`Welcome back, ${data.username || 'Admin'}`);
        navigate("/manage");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950 px-6 py-12 transition-colors duration-300">
      <Link to="/" className="mb-8 flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold transition-colors">
        <ChevronLeft size={20} /> Back to Home
      </Link>

      <div className="w-full max-w-[440px] bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-emerald-100 dark:border-gray-800 shadow-2xl shadow-emerald-500/5">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Sign In</h1>
          <p className="text-gray-500 mt-2 font-medium">Access your Mara Dealers dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="email" required 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 focus:ring-4 ring-emerald-500/10 focus:border-emerald-500 outline-none text-gray-900 dark:text-white font-bold transition-all" 
                placeholder="admin@mara.com" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="password" required 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 focus:ring-4 ring-emerald-500/10 focus:border-emerald-500 outline-none text-gray-900 dark:text-white font-bold transition-all" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading} 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Enter Dashboard"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-gray-50 dark:border-gray-800 text-center text-gray-500 font-medium">
          New to the platform? <Link to="/signup" className="text-emerald-600 font-black hover:underline ml-1">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;