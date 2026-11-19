import { useState } from "react";
import { getRecommendations } from "../lib/api";
import Navbar from "../components/Navbar";

export default function Recommendations() {
  const [profile, setProfile] = useState({
    age: 30,
    gender: "male",
    weight_kg: 70,
    height_cm: 175,
    activity_level: "moderate",
    medical_conditions: "",
    diet: "balanced",
  });
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdvice("");
    try {
      const res = await getRecommendations(profile);
      setAdvice(res.data.advice);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Health Tips</h1>
        <p className="text-gray-500 mb-8">Fill out your basic profile to receive non-prescriptive wellness advice.</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input name="age" type="number" value={profile.age} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={profile.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input name="weight_kg" type="number" value={profile.weight_kg} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input name="height_cm" type="number" value={profile.height_cm} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
              <select name="activity_level" value={profile.activity_level} onChange={handleChange} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions (Optional)</label>
              <input name="medical_conditions" value={profile.medical_conditions} onChange={handleChange} placeholder="e.g., Asthma, Hypertension" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
            
            <button type="submit" disabled={loading} className="col-span-2 mt-4 bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Generating Advice..." : "Get Recommendations"}
            </button>
          </form>
        </div>

        {advice && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💡</span> Your Personalized Advice
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {advice}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}