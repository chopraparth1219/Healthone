import { useState } from "react";
import { checkSymptoms } from "../lib/api";
import Navbar from "../components/Navbar";

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await checkSymptoms(symptoms);
      setResult(res.data.ai_response);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Symptom Checker</h1>
        <p className="text-gray-500 mb-8">Describe your symptoms in detail for an AI triage assessment.</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="e.g., I have had a throbbing headache on the left side of my head for 3 days, along with mild nausea..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing Symptoms..." : "Check Symptoms"}
            </button>
          </form>
        </div>

        {result && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🤖</span> AI Assessment
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}