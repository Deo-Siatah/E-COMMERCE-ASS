import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { getUserProfile } from "./api/user"; 
import CarDetails from "./pages/CarDetails";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"

// Helper to decode JWT
const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle Token & Session
  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
    setToken(newToken);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userId = getUserIdFromToken(token);
        if (!userId) throw new Error("Invalid token");

        const userData = await getUserProfile(userId, token);
        setUser(userData); // This sets the full user object including username
      } catch (error) {
        console.error("Session fetch failed", error);
        handleSetToken(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 animate-pulse">Loading Mara Dealers...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-gray-950">
        <Navbar theme={theme} toggleTheme={toggleTheme} user={user} logout={() => handleSetToken(null)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Inventory/>}/>
            <Route 
              path="/profile" 
              element={token ? <Profile logout={() => handleSetToken(null)} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!token ? <Login setAuthToken={handleSetToken} /> : <Navigate to="/manage" />} 
            />
            <Route 
              path="/signup" 
              element={!token ? <Signup /> : <Navigate to="/manage" />} 
            />
            <Route 
              path="/manage" 
              element={token ? <Services /> : <Navigate to="/login" />} 
            />
            <Route path="/cars/:id" element={<CarDetails/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </main>
        <Toaster richColors position="top-right" theme={theme} />
      </div>
    </Router>
  );
}

export default App;