import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api/user";
import { toast } from "sonner";
import { Loader2, User, Mail, ShieldCheck, LogOut, Save, Edit2, XCircle } from "lucide-react";

const Profile = ({ logout }) => {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [originalData, setOriginalData] = useState({ username: "", email: "" }); // To restore on cancel
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId, token);
        setUserData(data);
        setOriginalData(data); // Save a backup
      } catch (error) {
        toast.error("Failed to load profile details");
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updated = await updateUserProfile(userId, userData, token);
      setUserData(updated);
      setOriginalData(updated); // Update backup to new details
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setUserData(originalData); // Revert to original data
    setIsEditing(false);
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-28 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-gray-800 shadow-md">
            <User size={40} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
             {originalData.username}'s Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400">View your details or update your account information.</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                disabled={!isEditing}
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white transition-all ${
                    isEditing ? "bg-white dark:bg-gray-700 shadow-inner" : "bg-gray-50 dark:bg-gray-800 opacity-70"
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email"
                disabled={!isEditing}
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white transition-all ${
                    isEditing ? "bg-white dark:bg-gray-700 shadow-inner" : "bg-gray-50 dark:bg-gray-800 opacity-70"
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
            <ShieldCheck className="text-emerald-600" size={20} />
            <p className="text-sm text-emerald-800 dark:text-emerald-400 font-medium">Your account is secure and active.</p>
          </div>

          {/* Logic for Action Buttons */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
            {isEditing ? (
              <>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save</>}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                >
                  <XCircle size={20} /> Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <Edit2 size={20} /> Edit Profile
                </button>
                <button 
                  type="button"
                  onClick={logout}
                  className="flex-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;