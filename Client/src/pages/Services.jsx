import { useState, useEffect } from "react";
import { getAllCars, createCar, updateCar, deleteCar } from "../api/cars";
import { toast } from "sonner";
import { 
  Plus, Pencil, Trash2, Loader2, Car, 
  DollarSign, Hash, Calendar, Fuel, Settings2, 
  ShieldAlert, Image as ImageIcon, CheckCircle2, XCircle
} from "lucide-react";

const Services = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  
  const token = localStorage.getItem("token");

  // Expanded to match your Mongoose Schema
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    description: "",
    images: "", 
    condition: "Used",
    fuelType: "Petrol",
    mileage: "",
    transmission: "Automatic",
    isSold: false
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getAllCars();
      setCars(Array.isArray(data) ? data : (data?.cars || []));
    } catch (err) {
      toast.error("Could not load inventory");
      setCars([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    // Prepare data: Convert images string back to array for Mongoose
    const finalData = {
      ...formData,
      images: formData.images.split(",").map(url => url.trim()).filter(url => url !== "")
    };

    try {
      if (isEditing) {
        await updateCar(isEditing, finalData, token);
        toast.success("Vehicle updated successfully");
      } else {
        await createCar(finalData, token);
        toast.success("New vehicle added to Mara Dealers");
      }
      setShowModal(false);
      resetForm();
      fetchInventory();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      make: "", model: "", year: new Date().getFullYear(), price: "", 
      description: "", images: "", fuelType: "Petrol", 
      transmission: "Automatic", mileage: "", condition: "Used", isSold: false
    });
    setIsEditing(null);
  };

  const openEdit = (car) => {
    setFormData({
      ...car,
      images: car.images?.join(", ") || "" // Convert array back to string for input
    });
    setIsEditing(car._id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 p-6 md:mt-10 lg:p-12 pt-24 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">Inventory Management</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Dashboard for <span className="text-emerald-600 font-bold">Mara Dealers</span> Showroom</p>
          </div>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add New Vehicle
          </button>
        </div>

        {/* Inventory List (Same as before but with Sold status) */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-emerald-100 dark:border-gray-800 overflow-hidden shadow-sm">
          {loading ? (
             <div className="py-32 flex justify-center"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-gray-800/50 border-b border-emerald-50 dark:border-gray-800">
                    <th className="p-6 font-bold text-gray-400 uppercase text-xs tracking-widest">Car</th>
                    <th className="p-6 font-bold text-gray-400 uppercase text-xs tracking-widest">Price & Details</th>
                    <th className="p-6 font-bold text-gray-400 uppercase text-xs tracking-widest">Status</th>
                    <th className="p-6 font-bold text-gray-400 uppercase text-xs tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 dark:divide-gray-800">
                  {cars.map((car) => (
                    <tr key={car._id} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors">
                      <td className="p-6">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">{car.make} {car.model}</div>
                        <div className="text-sm text-gray-400">{car.year} • {car.transmission}</div>
                      </td>
                      <td className="p-6">
                        <div className="font-black text-emerald-600 dark:text-emerald-400">${car.price?.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 uppercase font-bold">{car.fuelType} • {car.mileage?.toLocaleString()} mi</div>
                      </td>
                      <td className="p-6">
                        {car.isSold ? (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-black rounded-full uppercase">
                            <XCircle size={14} /> Sold
                           </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black rounded-full uppercase">
                            <CheckCircle2 size={14} /> Available
                          </span>
                        )}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(car)} className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(car._id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* --- EXPANDED MODAL FORM --- */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[3rem] p-10 max-h-[92vh] overflow-y-auto border border-emerald-100/20 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">
              {isEditing ? "Edit Listing" : "Create New Listing"}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Make</label>
                <input required value={formData.make} onChange={(e)=>setFormData({...formData, make: e.target.value})} className="form-input-styled w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold focus:border-emerald-500" placeholder="Toyota" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Model</label>
                <input required value={formData.model} onChange={(e)=>setFormData({...formData, model: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="Camry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Year</label>
                <input type="number" required value={formData.year} onChange={(e)=>setFormData({...formData, year: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="2024" />
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Price ($)</label>
                <input type="number" required value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="32000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Mileage (mi)</label>
                <input type="number" value={formData.mileage} onChange={(e)=>setFormData({...formData, mileage: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="5000" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Condition</label>
                <select value={formData.condition} onChange={(e)=>setFormData({...formData, condition: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold">
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>

              {/* Row 3 - Enums */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Fuel Type</label>
                <select value={formData.fuelType} onChange={(e)=>setFormData({...formData, fuelType: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Transmission</label>
                <select value={formData.transmission} onChange={(e)=>setFormData({...formData, transmission: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Availability</label>
                <div className="flex items-center gap-4 h-[54px] px-5 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-emerald-50 dark:border-gray-700">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Mark as Sold?</label>
                   <input type="checkbox" checked={formData.isSold} onChange={(e)=>setFormData({...formData, isSold: e.target.checked})} className="w-5 h-5 accent-emerald-600" />
                </div>
              </div>

              {/* Images & Description */}
              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ImageIcon size={14} /> Image URLs (comma separated)
                </label>
                <textarea rows="2" value={formData.images} onChange={(e)=>setFormData({...formData, images: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="https://image1.jpg, https://image2.jpg" />
              </div>

              <div className="md:col-span-3 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
                <textarea required rows="3" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-emerald-50 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-bold" placeholder="Tell us about the car..." />
              </div>

              <div className="md:col-span-3 flex gap-4 mt-6">
                <button type="submit" disabled={btnLoading} className="flex-[3] bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-emerald-600/20">
                  {btnLoading ? <Loader2 className="animate-spin mx-auto" /> : (isEditing ? "Save Changes" : "Create Listing")}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 rounded-3xl font-black bg-slate-100 dark:bg-gray-800 text-gray-500 hover:bg-slate-200 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;