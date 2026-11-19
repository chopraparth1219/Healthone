import { useState } from "react";
import { summarizeReport } from "../lib/api";
import Navbar from "../components/Navbar";

export default function Reports() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (text) formData.append("text", text);

    try {
      const res = await summarizeReport(formData);
      setSummary(res.data.summary);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Summarizer</h1>
        <p className="text-gray-500 mb-8">Upload a medical PDF or paste text to get a patient-friendly explanation.</p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF Report (Optional)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>
            
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR paste text</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text from your lab results here..."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || (!file && !text)}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Summarizing..." : "Summarize Report"}
            </button>
          </form>
        </div>

        {summary && (
          <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📝</span> Summary
            </h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {summary}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}